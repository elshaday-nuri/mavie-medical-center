import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  FaArrowRightFromBracket,
  FaCalendarCheck,
  FaCircleCheck,
  FaClock,
  FaHouse,
  FaMagnifyingGlass,
  FaRotate,
  FaTrash,
  FaTriangleExclamation,
  FaUserCheck,
  FaXmark,
} from "react-icons/fa6";

import MavieLogo from "../components/MavieLogo";

const API_URL = `${
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
}/appointments`;

function Dashboard() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });
const getAuthConfig = () => {
  const token = localStorage.getItem("mavieAdminToken");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await axios.get(
  API_URL,
  getAuthConfig()
);
      setAppointments(response.data);
    }
     catch (error) {
  console.error("Dashboard fetch error:", error);

  if (error.response?.status === 401) {
    localStorage.removeItem("mavieAdminToken");
    localStorage.removeItem("mavieAdminUser");
    navigate("/admin");
    return;
  }

  setMessage({
    type: "error",
    text:
      error.response?.data?.message ||
      "Could not load appointments.",
  });
}
     finally {
      setLoading(false);
    }
  }, []);

 useEffect(() => {
  const token = localStorage.getItem("mavieAdminToken");

  if (!token) {
    navigate("/admin");
    return;
  }

  fetchAppointments();
}, [fetchAppointments, navigate]);

 const handleLogout = () => {
  localStorage.removeItem("mavieAdminToken");
  localStorage.removeItem("mavieAdminUser");
  navigate("/admin");
};

  const updateStatus = async (appointmentId, newStatus) => {
    setActionLoadingId(appointmentId);
    setMessage({ type: "", text: "" });

    try {
     const response = await axios.put(
  `${API_URL}/${appointmentId}/status`,
  {
    status: newStatus,
  },
  getAuthConfig()
);

      setAppointments((currentAppointments) =>
        currentAppointments.map((appointment) =>
          appointment.id === appointmentId
            ? {
                ...appointment,
                status: newStatus,
              }
            : appointment
        )
      );

      setMessage({
        type: "success",
        text: response.data.message,
      });
    } catch (error) {
      console.error("Status update error:", error);

      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Could not update appointment status.",
      });
    } finally {
      setActionLoadingId(null);
    }
  };

  const deleteAppointment = async (appointmentId, patientName) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the appointment for ${patientName}?`
    );

    if (!confirmed) {
      return;
    }

    setActionLoadingId(appointmentId);
    setMessage({ type: "", text: "" });

    try {
      const response = await axios.delete(
  `${API_URL}/${appointmentId}`,
  getAuthConfig()
);

      setAppointments((currentAppointments) =>
        currentAppointments.filter(
          (appointment) => appointment.id !== appointmentId
        )
      );

      setMessage({
        type: "success",
        text: response.data.message,
      });
    } catch (error) {
      console.error("Delete appointment error:", error);

      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Could not delete the appointment.",
      });
    } finally {
      setActionLoadingId(null);
    }
  };

  const counts = useMemo(() => {
    return {
      total: appointments.length,
      pending: appointments.filter(
        (appointment) => appointment.status === "Pending"
      ).length,
      confirmed: appointments.filter(
        (appointment) => appointment.status === "Confirmed"
      ).length,
      completed: appointments.filter(
        (appointment) => appointment.status === "Completed"
      ).length,
      cancelled: appointments.filter(
        (appointment) => appointment.status === "Cancelled"
      ).length,
    };
  }, [appointments]);

  const filteredAppointments = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return appointments.filter((appointment) => {
      const matchesSearch = `
        ${appointment.fullName || ""}
        ${appointment.email || ""}
        ${appointment.phone || ""}
        ${appointment.service || ""}
        ${appointment.status || ""}
      `
        .toLowerCase()
        .includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "All" ||
        appointment.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [appointments, searchTerm, statusFilter]);

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "Not provided";
    }

    return new Date(dateValue).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeValue) => {
    if (!timeValue) {
      return "Not provided";
    }

    const [hours, minutes] = timeValue.split(":");

    const date = new Date();
    date.setHours(Number(hours), Number(minutes));

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <main className="admin-dashboard-page">
      <aside className="admin-sidebar">
        <MavieLogo light />

        <nav className="admin-sidebar-navigation">
          <button
  type="button"
  onClick={() => navigate("/")}
>
  <FaHouse />
  Back to Home
</button>
          <button className="active" type="button">
            <FaCalendarCheck />
            Appointments
          </button>
        </nav>

        <button
          className="admin-logout-button"
          type="button"
          onClick={handleLogout}
        >
          <FaArrowRightFromBracket />
          Log Out
        </button>
      </aside>

      <section className="admin-dashboard-content">
        <div className="admin-dashboard-header">
          <div>
            <span>Administration</span>
            <h1>Appointment Dashboard</h1>
            <p>
              Review and manage patient appointment requests.
            </p>
          </div>

          <button
            className="btn refresh-dashboard-button"
            type="button"
            onClick={fetchAppointments}
            disabled={loading}
          >
            <FaRotate />
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {message.text && (
          <div
            className={`dashboard-message ${
              message.type === "success"
                ? "dashboard-success-message"
                : "dashboard-error-message"
            }`}
          >
            {message.type === "success" ? (
              <FaCircleCheck />
            ) : (
              <FaTriangleExclamation />
            )}

            <span>{message.text}</span>
          </div>
        )}

        <div className="dashboard-stat-grid">
          <div className="dashboard-stat-card">
            <div className="stat-card-icon">
              <FaCalendarCheck />
            </div>

            <div>
              <span>Total appointments</span>
              <strong>{counts.total}</strong>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="stat-card-icon pending-icon">
              <FaClock />
            </div>

            <div>
              <span>Pending</span>
              <strong>{counts.pending}</strong>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="stat-card-icon confirmed-icon">
              <FaUserCheck />
            </div>

            <div>
              <span>Confirmed</span>
              <strong>{counts.confirmed}</strong>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="stat-card-icon completed-icon">
              <FaCircleCheck />
            </div>

            <div>
              <span>Completed</span>
              <strong>{counts.completed}</strong>
            </div>
          </div>
        </div>

        <div className="appointments-panel">
          <div className="appointments-panel-header">
            <div>
              <h2>Appointment Requests</h2>

              <p>
                Showing {filteredAppointments.length} of{" "}
                {appointments.length} requests.
              </p>
            </div>

            <div className="dashboard-toolbar">
              <div className="dashboard-search">
                <FaMagnifyingGlass />

                <input
                  type="search"
                  placeholder="Search appointments"
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(event.target.value)
                  }
                />
              </div>

              <select
                className="dashboard-status-filter"
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
                aria-label="Filter appointments by status"
              >
                <option value="All">All statuses</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="dashboard-empty-state">
              Loading appointments...
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="dashboard-empty-state">
              No appointment requests found.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table admin-appointments-table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Contact</th>
                    <th>Service</th>
                    <th>Date and time</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredAppointments.map(
                    (appointment) => {
                      const isActionLoading =
                        actionLoadingId === appointment.id;

                      return (
                        <tr key={appointment.id}>
                          <td>
                            <strong>
                              {appointment.fullName}
                            </strong>

                            <span>
                              Patient #{appointment.id}
                            </span>
                          </td>

                          <td>
                            <strong>
                              {appointment.email}
                            </strong>

                            <span>
                              {appointment.phone}
                            </span>
                          </td>

                          <td>
                            <span className="service-badge">
                              {appointment.service}
                            </span>

                            {appointment.message && (
                              <span
                                className="appointment-message"
                                title={appointment.message}
                              >
                                {appointment.message}
                              </span>
                            )}
                          </td>

                          <td>
                            <strong>
                              {formatDate(
                                appointment.appointmentDate
                              )}
                            </strong>

                            <span>
                              {formatTime(
                                appointment.appointmentTime
                              )}
                            </span>
                          </td>

                          <td>
                            <span
                              className={`appointment-status status-${(
                                appointment.status || "Pending"
                              ).toLowerCase()}`}
                            >
                              {appointment.status || "Pending"}
                            </span>
                          </td>

                          <td>
                            <div className="appointment-actions">
                              <select
                                value={
                                  appointment.status || "Pending"
                                }
                                onChange={(event) =>
                                  updateStatus(
                                    appointment.id,
                                    event.target.value
                                  )
                                }
                                disabled={isActionLoading}
                                aria-label={`Update status for ${appointment.fullName}`}
                              >
                                <option value="Pending">
                                  Pending
                                </option>

                                <option value="Confirmed">
                                  Confirmed
                                </option>

                                <option value="Completed">
                                  Completed
                                </option>

                                <option value="Cancelled">
                                  Cancelled
                                </option>
                              </select>

                              <button
                                type="button"
                                className="delete-appointment-button"
                                onClick={() =>
                                  deleteAppointment(
                                    appointment.id,
                                    appointment.fullName
                                  )
                                }
                                disabled={isActionLoading}
                                aria-label={`Delete appointment for ${appointment.fullName}`}
                                title="Delete appointment"
                              >
                                {isActionLoading ? (
                                  "..."
                                ) : (
                                  <FaTrash />
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Dashboard;