import logo from "../assets/mavie-logo.png";

function MavieLogo({ light = false }) {
  return (
    <div className={`mavie-logo ${light ? "light" : ""}`}>
      <img
        src={logo}
        alt="Mavie Medical Center"
        className="mavie-logo-image"
      />

      <div className="mavie-logo-text">
        <h3>MAVIE</h3>
        <span>Medical Center</span>
      </div>
    </div>
  );
}

export default MavieLogo;