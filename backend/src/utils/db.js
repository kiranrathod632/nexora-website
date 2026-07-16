const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "..", "..", "data", "db.json");

function readDb() {
  if (!fs.existsSync(dbPath)) {
    const initial = { users: [], transactions: [] };
    fs.writeFileSync(dbPath, JSON.stringify(initial, null, 2));
    return initial;
  }
  return JSON.parse(fs.readFileSync(dbPath, "utf-8"));
}

function writeDb(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

module.exports = { readDb, writeDb };
