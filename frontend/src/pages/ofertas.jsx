import React from "react";


export default function Ventas() {
  return (
    <div className="ventas-container">
      <h1 className="ventas-title">¡Grandes Ofertas Próximamente!</h1>
      <p className="ventas-message">
        Pronto tendremos excelentes ofertas para ti. ¡No te lo pierdas!
      </p>
      <div className="ventas-icon">
        <img
          src="https://img.icons8.com/ios-filled/50/007bff/sale.png"
          alt="Ofertas"
        />
      </div>
      <a href="/ofertas" className="ventas-button">
        Ver Ofertas
      </a>
    </div>
  );
}
