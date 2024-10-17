import React, { useState } from "react";
import ModalReserva from "../modal/ModalReserva";
import ButtonReserva from "../modal/ButtonReserva";

const LavarControl = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Abre el modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Cierra el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Botón que abre el modal */}
      <ButtonReserva openModal={openModal} label="¡Quiero lavar mi coche!" />

      {/* Renderiza el modal solo si está abierto */}
      {isModalOpen && <ModalReserva closeModal={closeModal} />}
    </div>
  );
};

export default LavarControl;
