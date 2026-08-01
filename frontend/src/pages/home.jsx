import { Link } from "react-router-dom";
import {
  FaCalendarCheck,
  FaClock,
  FaHeartPulse,
  FaUserDoctor,
  FaShieldHeart,
  FaPhone,
  FaArrowRight,
} from "react-icons/fa6";

function Home() {
  return (
    <>
      <section className="hospital-hero">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="hero-badge">
                <FaHeartPulse />
                Trusted healthcare for your family
              </div>

              <h1>
                Quality medical care when you need it most.
              </h1>

              <p className="hero-description">
                Request an appointment with our experienced healthcare
                professionals quickly and securely.
              </p>

              <div className="hero-buttons">
                <Link
                  to="/appointment"
                  className="btn hero-primary-button"
                >
                  Book an Appointment
                  <FaArrowRight />
                </Link>

                <a
                  href="tel:911"
                  className="btn hero-secondary-button"
                >
                  <FaPhone />
                  Emergency: 911
                </a>
              </div>

              <div className="hero-features">
                <div>
                  <FaCalendarCheck />
                  <span>Easy scheduling</span>
                </div>

                <div>
                  <FaClock />
                  <span>Fast response</span>
                </div>

                <div>
                  <FaShieldHeart />
                  <span>Secure information</span>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="hero-visual">
                <div className="medical-illustration">
                  <div className="medical-circle large-circle"></div>
                  <div className="medical-circle small-circle"></div>

                  <div className="doctor-card">
                    <div className="doctor-icon">
                      <FaUserDoctor />
                    </div>

                    <h3>Professional Care</h3>

                    <p>
                      Compassionate healthcare from qualified medical
                      professionals.
                    </p>
                  </div>

                  <div className="availability-card">
                    <span className="availability-dot"></span>

                    <div>
                      <strong>Appointments Available</strong>
                      <small>Request your preferred date today</small>
                    </div>
                  </div>

                  <div className="heart-card">
                    <FaHeartPulse />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hospital-services-section">
        <div className="container">
          <div className="section-heading">
            <span>Our Services</span>
            <h2>Healthcare designed around you</h2>
            <p>
              Select the service you need and submit an appointment
              request in just a few minutes.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="service-card">
                <div className="service-icon">
                  <FaUserDoctor />
                </div>

                <h3>General Consultation</h3>

                <p>
                  Meet with a healthcare professional for routine
                  checkups and general medical concerns.
                </p>

                <Link to="/appointment">
                  Request appointment <FaArrowRight />
                </Link>
              </div>
            </div>

            <div className="col-md-4">
              <div className="service-card">
                <div className="service-icon">
                  <FaHeartPulse />
                </div>

                <h3>Specialist Care</h3>

                <p>
                  Request specialized care based on your health needs
                  and physician recommendations.
                </p>

                <Link to="/appointment">
                  Request appointment <FaArrowRight />
                </Link>
              </div>
            </div>

            <div className="col-md-4">
              <div className="service-card">
                <div className="service-icon">
                  <FaCalendarCheck />
                </div>

                <h3>Follow-Up Visit</h3>

                <p>
                  Schedule follow-up care to review progress,
                  treatments, or previous medical results.
                </p>

                <Link to="/appointment">
                  Request appointment <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="appointment-cta">
        <div className="container">
          <div className="cta-content">
            <div>
              <span>Need medical assistance?</span>
              <h2>Request your appointment today.</h2>
              <p>
                Complete our secure form and our team will contact you
                to confirm your appointment.
              </p>
            </div>

            <Link to="/appointment" className="btn cta-button">
              Get Started
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;