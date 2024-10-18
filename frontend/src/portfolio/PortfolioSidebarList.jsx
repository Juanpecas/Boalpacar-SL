import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PortfolioSidebarList = ({ data, handleEditClick, handleDeleteClick }) => {
  const portfolioList = data.map((portfolioItem) => (
    <div key={portfolioItem.id} className="portfolio-item-thumb">
      <div className="portfolio-thumb-img">
        <img
          src={portfolioItem.thumb_image_url}
          alt={`${portfolioItem.name} thumbnail`}
        />
      </div>

      <div className="text-content">
        <div className="title">{portfolioItem.name}</div>

        <div className="actions">
          <a
            className="action-icon"
            onClick={() => handleEditClick(portfolioItem)}
            aria-label={`Edit ${portfolioItem.name}`}
          >
            <FontAwesomeIcon icon="edit" />
          </a>

          <a
            className="action-icon"
            onClick={() => handleDeleteClick(portfolioItem)}
            aria-label={`Delete ${portfolioItem.name}`}
          >
            <FontAwesomeIcon icon="trash" />
          </a>
        </div>
      </div>
    </div>
  ));

  return <div className="portfolio-sidebar-list-wrapper">{portfolioList}</div>;
};

export default PortfolioSidebarList;
