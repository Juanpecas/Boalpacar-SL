import React from "react";

const ButtonReserva = ({ openModal, label }) => {
  return (
    <div className="banner-logo">
      <button className="button-openmodal1" onClick={openModal}>
        {label}
      </button>
    </div>
  );
};

export default ButtonReserva;
