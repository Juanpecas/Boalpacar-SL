import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css"; 

const ContactButtons = () => {
  return (
    <div className="contact-buttons">
      <a
        href="https://wa.me/+34634834587"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-whatsapp"></i>
      </a>
      <a
        href="tel:+34944407105"
        className="call-float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fas fa-phone"></i>
      </a>
    </div>
  );
};

export default ContactButtons;
