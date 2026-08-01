import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaLocationDot,
  FaPhone,
} from "react-icons/fa6";
import MavieLogo from "./MavieLogo";

function Footer() {
  return (
    <footer className="hospital-footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-5">
            <div className="footer-brand">
              <MavieLogo light />
            </div>

            <p className="footer-description">
              Providing compassionate and accessible healthcare for
              individuals and families in our community.
            </p>
          </div>

          <div className="col-6 col-lg-3">
            <h3>Quick Links</h3>

            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>

              <li>
                <Link to="/appointment">
                  Book Appointment
                </Link>
              </li>

              <li>
                <Link to="/admin">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-12 col-lg-4">
            <h3>Contact Information</h3>

            <ul className="footer-contact">
              <li>
                <FaLocationDot />
                <span>
                  123 Medical Center Drive, Alexandria, VA
                </span>
              </li>

              <li>
                <FaPhone />
                <span>(703) 555-0145</span>
              </li>

              <li>
                <FaEnvelope />
                <span>appointments@maviemedical.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Mavie Medical Center.
            All rights reserved.
          </p>

          <p>For emergencies, call 911.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;