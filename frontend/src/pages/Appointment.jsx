import AppointmentForm from "../components/AppointmentForm";
import {
  FaCalendarCheck,
  FaPhone,
  FaShieldHeart,
} from "react-icons/fa6";

function Appointment() {
  return (
    <main className="appointment-page">
      <section className="appointment-page-header">
        <div className="container text-center">
          <span className="page-label">Online Scheduling</span>

          <h1>Request an Appointment</h1>

          <p>
            Complete the form below and our medical team will contact
            you to confirm your appointment.
          </p>
        </div>
      </section>

      <section className="appointment-content">
        <div className="container">
          <div className="row g-4 align-items-start">
            <div className="col-lg-4">
              <div className="appointment-information">
                <span className="information-label">
                  Before you submit
                </span>

                <h2>We’re here to help.</h2>

                <p>
                  Provide accurate contact information so our team can
                  reach you regarding your appointment request.
                </p>

                <div className="information-item">
                  <div>
                    <FaCalendarCheck />
                  </div>

                  <span>
                    <strong>Choose your preferred date</strong>
                    Your appointment is confirmed only after our team
                    contacts you.
                  </span>
                </div>

                <div className="information-item">
                  <div>
                    <FaPhone />
                  </div>

                  <span>
                    <strong>Keep your phone available</strong>
                    Our scheduling team may call or email you for
                    confirmation.
                  </span>
                </div>

                <div className="information-item">
                  <div>
                    <FaShieldHeart />
                  </div>

                  <span>
                    <strong>Your information is protected</strong>
                    We only use your information to process your
                    appointment request.
                  </span>
                </div>

                <div className="emergency-notice">
                  <strong>Medical emergency?</strong>
                  <p>
                    Do not use this form for emergencies. Call 911
                    immediately.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <AppointmentForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Appointment;