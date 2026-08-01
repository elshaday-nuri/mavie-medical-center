const db = require("../config/db");

const createAppointment = (req, res) => {
  const {
    fullName,
    email,
    phone,
    appointmentDate,
    appointmentTime,
    service,
    message,
  } = req.body;

  if (
    !fullName ||
    !email ||
    !phone ||
    !appointmentDate ||
    !appointmentTime ||
    !service
  ) {
    return res.status(400).json({
      message: "Please complete all required fields.",
    });
  }

  const sql = `
    INSERT INTO appointments
    (
      fullName,
      email,
      phone,
      appointmentDate,
      appointmentTime,
      service,
      message,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    fullName,
    email,
    phone,
    appointmentDate,
    appointmentTime,
    service,
    message || "",
    "Pending",
  ];

  db.query(sql, values, (error, result) => {
    if (error) {
      console.error("Create appointment error:", error);

      return res.status(500).json({
        message: "Error saving appointment.",
        error: error.message,
      });
    }

    return res.status(201).json({
      message: "Appointment request submitted successfully.",
      appointmentId: result.insertId,
    });
  });
};

const getAppointments = (req, res) => {
  const sql = `
    SELECT *
    FROM appointments
    ORDER BY created_at DESC
  `;

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Fetch appointments error:", error);

      return res.status(500).json({
        message: "Error fetching appointments.",
        error: error.message,
      });
    }

    return res.status(200).json(results);
  });
};

const updateAppointmentStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowedStatuses = [
    "Pending",
    "Confirmed",
    "Completed",
    "Cancelled",
  ];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      message: "Invalid appointment status.",
    });
  }

  const sql = `
    UPDATE appointments
    SET status = ?
    WHERE id = ?
  `;

  db.query(sql, [status, id], (error, result) => {
    if (error) {
      console.error("Update status error:", error);

      return res.status(500).json({
        message: "Error updating appointment status.",
        error: error.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Appointment not found.",
      });
    }

    return res.status(200).json({
      message: `Appointment marked as ${status}.`,
    });
  });
};

const deleteAppointment = (req, res) => {
  const { id } = req.params;

  const sql = `
    DELETE FROM appointments
    WHERE id = ?
  `;

  db.query(sql, [id], (error, result) => {
    if (error) {
      console.error("Delete appointment error:", error);

      return res.status(500).json({
        message: "Error deleting appointment.",
        error: error.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Appointment not found.",
      });
    }

    return res.status(200).json({
      message: "Appointment deleted successfully.",
    });
  });
};

module.exports = {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
  deleteAppointment,
};