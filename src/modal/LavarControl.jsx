
import React, { useState } from "react";
import ModalReserva from "./ModalReserva";
import ButtonReserva from "./ButtonReserva";

const LavarControl = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      
      <ButtonReserva openModal={openModal} label="¡Quiero lavar mi coche!" />

      
      {isModalOpen && <ModalReserva closeModal={closeModal} />}
    </div>
  );
};

export default LavarControl;
