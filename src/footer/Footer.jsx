// Footer.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Solo necesitas FontAwesomeIcon
import BoalpacarLogo from "../assets/images/Boalpacar.png"; // Asegúrate de que la ruta sea correcta

const Footer = () => {
  return (
    <div className="wrapper-footer">
      <div className="banner-logo-footer">
        <img src={BoalpacarLogo} alt="Logo Boalpacar" />
      </div>
      <div className="aviso-legal">
        <h4>
          <a href="https://boalpacar.es/aviso-legal/">
            © 2024 Boalpacar | Aviso legal
          </a>
        </h4>
      </div>
      <div className="follow">
        Siguenos
        <div className="social-media">
          <div className="facebook">
            <a href="https://www.facebook.com/">
              <FontAwesomeIcon icon={["fab", "facebook"]} />{" "}
              {/* Usando el prefijo de la marca */}
            </a>
          </div>

          <div className="contact-info">
            <a href="mailto:info@example.com">
              <FontAwesomeIcon icon="envelope" /> {/* Ícono sólido */}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
