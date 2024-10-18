import React, { useState } from "react";
import ModalReserva from "../modal/ModalReserva";
import ButtonReserva from "../modal/ButtonReserva";

const ReservaControl = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      
      <ButtonReserva
        openModal={openModal}
        label="Reservar"
        aria-haspopup="true" 
      />

      
      {isModalOpen && <ModalReserva closeModal={closeModal} />}
    </div>
  );
};

export default ReservaControl;
