import React from "react";
import PropTypes from "prop-types"; // Importa PropTypes

const ButtonReserva = ({ openModal, label }) => {
  return (
    <div className="banner-logo">
      <button
        className="button-openmodal1"
        onClick={openModal}
        aria-label={label} // Mejora la accesibilidad
      >
        {label}
      </button>
    </div>
  );
};

// Define los tipos de las propiedades
ButtonReserva.propTypes = {
  openModal: PropTypes.func.isRequired, // La función openModal es obligatoria
  label: PropTypes.string.isRequired, // El label es obligatorio
};

export default ButtonReserva;
