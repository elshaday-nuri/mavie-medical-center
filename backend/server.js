const express = require("express");
const cors = require("cors");
require("dotenv").config();

require("./config/db");

const appointmentRoutes = require("./routes/appointmentRoutes");

const app = express();
const authRoutes = require("./routes/authRoutes");

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Allow tools such as Postman and server-to-server requests
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origin not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Appointment Request API is running...");
});
app.use("/api/auth", authRoutes);

app.use("/api/appointments", appointmentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});