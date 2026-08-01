const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../config/db");

const loginAdmin = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required.",
    });
  }

  const normalizedEmail = email.trim().toLowerCase();

  const sql = `
    SELECT id, name, email, password
    FROM admins
    WHERE email = ?
    LIMIT 1
  `;

  db.query(sql, [normalizedEmail], async (error, results) => {
    if (error) {
      console.error("Admin login query error:", error);

      return res.status(500).json({
        message: "Unable to process login.",
      });
    }

    if (results.length === 0) {
      return res.status(401).json({
        message: "Incorrect email or password.",
      });
    }

    const admin = results[0];

    try {
      const passwordMatches = await bcrypt.compare(
        password,
        admin.password
      );

      if (!passwordMatches) {
        return res.status(401).json({
          message: "Incorrect email or password.",
        });
      }

      const token = jwt.sign(
        {
          adminId: admin.id,
          email: admin.email,
          role: "admin",
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES_IN || "8h",
        }
      );

      return res.status(200).json({
        message: "Login successful.",
        token,
        admin: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
        },
      });
    } catch (authenticationError) {
      console.error(
        "Authentication error:",
        authenticationError
      );

      return res.status(500).json({
        message: "Unable to process login.",
      });
    }
  });
};

module.exports = {
  loginAdmin,
};