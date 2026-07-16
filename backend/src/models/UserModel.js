const VALID_ROLES = ["admin", "user"];

class UserModel {
  static create({ name, email, passwordHash, role = "user" }) {
    if (!name || !email || !passwordHash) {
      throw new Error("name, email, and passwordHash are required");
    }
    if (!VALID_ROLES.includes(role)) {
      throw new Error("Invalid user role");
    }

    return {
      id: `u_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      passwordHash,
      role,
      kycStatus: "pending",
      membershipActive: false,
      membershipPlan: null,
      balance: 0,
      createdAt: new Date().toISOString()
    };
  }

  static toPublic(user) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      kycStatus: user.kycStatus,
      membershipActive: user.membershipActive,
      membershipPlan: user.membershipPlan,
      balance: user.balance,
      createdAt: user.createdAt
    };
  }

  static update(user, payload = {}) {
    if (payload.name !== undefined) {
      const nextName = String(payload.name).trim();
      if (nextName) user.name = nextName;
    }
    if (payload.role !== undefined) {
      if (!VALID_ROLES.includes(payload.role)) {
        throw new Error("Role must be admin or user");
      }
      user.role = payload.role;
    }
    if (payload.membershipActive !== undefined) {
      user.membershipActive = Boolean(payload.membershipActive);
    }
    return user;
  }
}

module.exports = { UserModel, VALID_ROLES };
