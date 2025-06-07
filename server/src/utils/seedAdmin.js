const User = require("../models/user.model");
const bcrypt = require("bcrypt");

async function ensureAdminUser() {
  const adminExists = await User.findOne({ role: "admin" });

  if (!adminExists) {
    const admin = new User({
      name: "Admin",
      email: "admin@cafeteria.com",
      password: await bcrypt.hash("admin123", 10),
      role: "admin",
    });

    await admin.save();
    console.log("✅ Default admin user created");
  }
}

module.exports = ensureAdminUser;
