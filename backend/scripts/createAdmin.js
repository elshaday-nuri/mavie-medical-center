const bcrypt = require("bcrypt");
require("dotenv").config();

const db = require("../config/db");

const createAdmin = async () => {
  const name = "Mavie Administrator";
  const email = "elshadayeyob8@gmail.com";
  const plainPassword = "mavie2022";

  try {
    const hashedPassword = await bcrypt.hash(
      plainPassword,
      12
    );

    const sql = `
      INSERT INTO admins (name, email, password)
      VALUES (?, ?, ?)
    `;

    db.query(
      sql,
      [name, email, hashedPassword],
      (error, result) => {
        if (error) {
          if (error.code === "ER_DUP_ENTRY") {
            console.log(
              "An administrator with this email already exists."
            );
          } else {
            console.error(
              "Admin creation failed:",
              error.message
            );
          }

          process.exit(1);
        }

        console.log("Administrator created successfully.");
        console.log(`Admin ID: ${result.insertId}`);
        console.log(`Email: ${email}`);

        process.exit(0);
      }
    );
  } catch (error) {
    console.error("Password hashing failed:", error.message);
    process.exit(1);
  }
};

createAdmin();