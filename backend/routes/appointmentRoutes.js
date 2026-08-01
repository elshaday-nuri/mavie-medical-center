const express = require("express");

const {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
  deleteAppointment,
} = require("../controllers/appointmentController");

const {
  protectAdmin,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Public patient route
router.post("/", createAppointment);

// Protected administrator routes
router.get("/", protectAdmin, getAppointments);
router.put(
  "/:id/status",
  protectAdmin,
  updateAppointmentStatus
);
router.delete("/:id", protectAdmin, deleteAppointment);

module.exports = router;