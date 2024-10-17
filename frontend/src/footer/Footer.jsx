// Footer.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import BoalpacarLogo from "../assets/images/Boalpacar.png"; 

const Footer = () => {
  return (
    <div className="wrapper-footer">
      <div className="banner-logo-footer">
        <img src={BoalpacarLogo} alt="Logo Boalpacar" />
      </div>
      <div className="aviso-legal">
        <h4>
          <a href="https://boalpacar.es/aviso-legal/" target="_blank" rel="noopener noreferrer">
            © 2024 Boalpacar | Aviso legal
          </a>
        </h4>
      </div>
      <div className="follow">
        Síguenos
        <div className="social-media">
          <div className="facebook">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FontAwesomeIcon icon={["fab", "facebook"]} />
            </a>
          </div>

          <div className="contact-info">
            <a href="mailto:info@example.com" aria-label="Email">
              <FontAwesomeIcon icon="envelope" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

