// src/pages/PortfolioItem.jsx
import React, { useState } from "react";
import ReservaControl from "../modal/ReservaControl"; // Asegúrate de que la ruta sea correcta

const PortfolioItem = ({ item }) => {
  const [portfolioItemClass, setPortfolioItemClass] = useState("");

  const handleMouseEnter = () => {
    setPortfolioItemClass("image-blur");
  };

  const handleMouseLeave = () => {
    setPortfolioItemClass("");
  };

  const { name, description, thumb_image_url, logo_url } = item;

  return (
    <div
      className="portfolio-item-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`portfolio-img-background ${portfolioItemClass}`}
        style={{ backgroundImage: `url(${thumb_image_url})` }}
      />

      <div className="img-text-wrapper">
        <div className="title">{name}</div>
        <div className="subtitle">{description}</div>
        <div className="logo-wrapper">
          <img src={logo_url} alt={`${name} logo`} />
        </div>
      </div>

      {/* Botón de reservar que abre el modal */}
      <div className="reserve-button-wrapper">
        <ReservaControl />
      </div>
    </div>
  );
};

export default PortfolioItem;
