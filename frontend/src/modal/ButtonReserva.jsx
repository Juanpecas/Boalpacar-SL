import React from "react";
import PropTypes from "prop-types"; 

const ButtonReserva = ({ openModal, label }) => {
  return (
    <div className="banner-logo">
      <button
        className="button-openmodal1"
        onClick={openModal}
        aria-label={label} 
      >
        {label}
      </button>
    </div>
  );
};


ButtonReserva.propTypes = {
  openModal: PropTypes.func.isRequired, 
  label: PropTypes.string.isRequired, 
};

export default ButtonReserva;
