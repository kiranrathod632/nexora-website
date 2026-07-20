require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { auth, adminOnly } = require("./src/middleware/auth");
const { readDb, writeDb } = require("./src/utils/db");
const { UserModel } = require("./src/models/UserModel");
const { TransactionModel } = require("./src/models/TransactionModel");

const app = express();
app.use(cors());
app.use(express.json());

const createToken = (user) =>
  jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });

const safeUser = (user) => UserModel.toPublic(user);

app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email and password are required" });
  }

  const db = readDb();
  const exists = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (exists) return res.status(409).json({ message: "Email already registered" });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = UserModel.create({
    name,
    email,
    passwordHash,
    role: db.users.length === 0 ? "admin" : "user"
  });

  db.users.push(user);
  writeDb(db);

  const token = createToken(user);
  return res.status(201).json({ token, user: safeUser(user) });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const db = readDb();
  const user = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());

  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = createToken(user);
  return res.json({ token, user: safeUser(user) });
});

app.post("/api/auth/logout", auth, (_req, res) => {
  // JWT is stateless in this implementation; client should remove token.
  return res.json({ message: "Logged out successfully" });
});

app.get("/api/auth/me", auth, (req, res) => {
  const db = readDb();
  const user = db.users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  return res.json({ user: safeUser(user) });
});

app.post("/api/kyc/submit", auth, (req, res) => {
  const { panNumber, aadhaarNumber } = req.body;
  if (!panNumber || !aadhaarNumber) {
    return res.status(400).json({ message: "PAN and Aadhaar are required" });
  }

  const db = readDb();
  const user = db.users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.kycStatus = "verified";
  user.kycDetails = { panNumber, aadhaarNumber, verifiedAt: new Date().toISOString() };
  writeDb(db);

  return res.json({ message: "KYC verified successfully", user: safeUser(user) });
});

app.post("/api/membership/activate", auth, (req, res) => {
  const db = readDb();
  const user = db.users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.membershipActive = true;
  user.membershipPlan = {
    name: "Founding Membership",
    fee: 10000,
    duration: "1 Year",
    activatedAt: new Date().toISOString()
  };

  db.transactions.unshift(
    TransactionModel.create({
      userId: user.id,
      type: "debit",
      amount: 10000,
      category: "membership",
      note: "Founding Membership Activation Fee"
    })
  );

  writeDb(db);
  return res.json({ message: "Membership activated", user: safeUser(user) });
});

app.post("/api/wallet/add-funds", auth, (req, res) => {
  const amount = Number(req.body.amount);
  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Valid amount is required" });
  }

  const db = readDb();
  const user = db.users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.balance += amount;
  db.transactions.unshift(
    TransactionModel.create({
      userId: user.id,
      type: "credit",
      amount,
      category: "wallet",
      note: "Funds added to wallet"
    })
  );

  writeDb(db);
  return res.json({ message: "Funds added", user: safeUser(user) });
});

app.get("/api/transactions", auth, (req, res) => {
  const db = readDb();
  const transactions = db.transactions.filter((t) => t.userId === req.user.id);
  return res.json({ transactions });
});

app.get("/api/learning", auth, (_req, res) => {
  return res.json({
    courses: [
      { id: 1, title: "Trading Basics", level: "Beginner", duration: "2h" },
      { id: 2, title: "Risk Management", level: "Beginner", duration: "1.5h" },
      { id: 3, title: "Market Psychology", level: "Intermediate", duration: "3h" },
      { id: 4, title: "Portfolio Strategy", level: "Intermediate", duration: "2.5h" }
    ]
  });
});

app.get("/api/admin/users", auth, adminOnly, (_req, res) => {
  const db = readDb();
  return res.json({ users: db.users.map(safeUser) });
});

app.get("/api/admin/users/:id", auth, adminOnly, (req, res) => {
  const db = readDb();
  const user = db.users.find((u) => u.id === req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  return res.json({ user: safeUser(user) });
});

app.post("/api/admin/users/:id/fund", auth, adminOnly, (req, res) => {
  const amount = Number(req.body.amount);
  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Valid amount is required" });
  }

  const db = readDb();
  const user = db.users.find((u) => u.id === req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.balance += amount;
  db.transactions.unshift(
    TransactionModel.create({
      userId: user.id,
      type: "credit",
      amount,
      category: "admin-fund",
      note: "Funds added by admin"
    })
  );

  writeDb(db);
  return res.json({ message: "Fund added successfully" });
});

app.patch("/api/admin/users/:id", auth, adminOnly, (req, res) => {
  const { name, role, membershipActive } = req.body;
  const db = readDb();
  const user = db.users.find((u) => u.id === req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  try {
    UserModel.update(user, { name, role, membershipActive });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  writeDb(db);
  return res.json({ message: "User updated successfully", user: safeUser(user) });
});

app.delete("/api/admin/users/:id", auth, adminOnly, (req, res) => {
  const db = readDb();
  const userIndex = db.users.findIndex((u) => u.id === req.params.id);
  if (userIndex === -1) return res.status(404).json({ message: "User not found" });

  const [deletedUser] = db.users.splice(userIndex, 1);
  db.transactions = db.transactions.filter((t) => t.userId !== deletedUser.id);
  writeDb(db);

  return res.json({ message: "User and related transactions deleted successfully" });
});

app.get("/api/admin/transactions", auth, adminOnly, (req, res) => {
  const db = readDb();
  const transactions = db.transactions.map((tx) => {
    const owner = db.users.find((u) => u.id === tx.userId);
    return {
      ...tx,
      userName: owner?.name || "Deleted User",
      userEmail: owner?.email || "N/A"
    };
  });
  return res.json({ transactions });
});

app.listen(process.env.PORT, () => {
  console.log(`Backend running on http://localhost:${process.env.PORT}`);
});
