import { Link, NavLink } from "react-router-dom";
import MavieLogo from "./MavieLogo";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg hospital-navbar sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <MavieLogo />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#hospitalNavbar"
          aria-controls="hospitalNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="hospitalNavbar"
        >
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end>
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/appointment">
                Book Appointment
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/admin">
                Admin
              </NavLink>
            </li>

            <li className="nav-item ms-lg-2">
              <Link
                className="btn hospital-nav-button"
                to="/appointment"
              >
                Request Appointment
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;