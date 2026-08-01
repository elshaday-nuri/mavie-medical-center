import { useState } from "react";
import axios from "axios";
import {
  FaCalendarCheck,
  FaCircleCheck,
  FaSpinner,
} from "react-icons/fa6";
 const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const initialFormData = {
  fullName: "",
  email: "",
  phone: "",
  appointmentDate: "",
  appointmentTime: "",
  service: "",
  message: "",
};

function AppointmentForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
     
await axios.post(
  `${API_URL}/appointments`,
  formData
);
      setSuccessMessage(
        response.data.message ||
          "Your appointment request was submitted successfully."
      );

      setFormData(initialFormData);
    } catch (error) {
      console.error("Appointment submission error:", error);

      setErrorMessage(
        error.response?.data?.message ||
          "We could not submit your request. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="appointment-form-card">
      <div className="form-heading">
        <div className="form-heading-icon">
          <FaCalendarCheck />
        </div>

        <div>
          <span>Appointment Form</span>
          <h2>Tell us how we can help</h2>
          <p>
            Fields marked with an asterisk are required.
          </p>
        </div>
      </div>

      {successMessage && (
        <div className="form-alert success-alert" role="alert">
          <FaCircleCheck />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="form-alert error-alert" role="alert">
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          <div className="col-md-6">
            <label htmlFor="fullName" className="form-label">
              Full Name <span>*</span>
            </label>

            <input
              id="fullName"
              type="text"
              name="fullName"
              className="form-control hospital-input"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              minLength="2"
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="email" className="form-label">
              Email Address <span>*</span>
            </label>

            <input
              id="email"
              type="email"
              name="email"
              className="form-control hospital-input"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="phone" className="form-label">
              Phone Number <span>*</span>
            </label>

            <input
              id="phone"
              type="tel"
              name="phone"
              className="form-control hospital-input"
              placeholder="(555) 123-4567"
              value={formData.phone}
              onChange={handleChange}
              minLength="7"
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="service" className="form-label">
              Medical Service <span>*</span>
            </label>

            <select
              id="service"
              name="service"
              className="form-select hospital-input"
              value={formData.service}
              onChange={handleChange}
              required
            >
              <option value="">Select a service</option>
              <option value="General Consultation">
                General Consultation
              </option>
              <option value="Primary Care">
                Primary Care
              </option>
              <option value="Dental Checkup">
                Dental Checkup
              </option>
              <option value="Eye Examination">
                Eye Examination
              </option>
              <option value="Pediatric Care">
                Pediatric Care
              </option>
              <option value="Follow-Up Visit">
                Follow-Up Visit
              </option>
            </select>
          </div>

          <div className="col-md-6">
            <label
              htmlFor="appointmentDate"
              className="form-label"
            >
              Preferred Date <span>*</span>
            </label>

            <input
              id="appointmentDate"
              type="date"
              name="appointmentDate"
              className="form-control hospital-input"
              min={today}
              value={formData.appointmentDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label
              htmlFor="appointmentTime"
              className="form-label"
            >
              Preferred Time <span>*</span>
            </label>

            <input
              id="appointmentTime"
              type="time"
              name="appointmentTime"
              className="form-control hospital-input"
              value={formData.appointmentTime}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12">
            <label htmlFor="message" className="form-label">
              Additional Information
            </label>

            <textarea
              id="message"
              name="message"
              className="form-control hospital-input"
              rows="5"
              placeholder="Briefly describe the reason for your appointment..."
              value={formData.message}
              onChange={handleChange}
              maxLength="500"
            ></textarea>

            <div className="character-count">
              {formData.message.length}/500
            </div>
          </div>

          <div className="col-12">
            <div className="form-disclaimer">
              By submitting this form, you understand that this is an
              appointment request and not a confirmed appointment.
            </div>
          </div>

          <div className="col-12">
            <button
              type="submit"
              className="btn submit-appointment-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="spin-icon" />
                  Submitting Request...
                </>
              ) : (
                <>
                  <FaCalendarCheck />
                  Submit Appointment Request
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AppointmentForm;