import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCarSide,
  faVanShuttle,
  faTruck,
  faTruckMoving,
} from "@fortawesome/free-solid-svg-icons";
import LavarControl from "../modal/LavarControl";

const PortfolioCardInfo = ({ openModal }) => {
  return (
    <div className="wrapper-middle">
      <div className="wrapper-center">
        <div className="wrapper-text-center">
          <div className="wrapper-text">
            <h5>Relájate, tu coche está con profesionales</h5>
            <h6>Dale a tu vehículo el cuidado que se merece.</h6>
          </div>
        </div>
        <LavarControl />
        <div className="wrapper-inf">
          <div className="cars-inf">
            <div className="coche" aria-label="Coche">
              <FontAwesomeIcon icon={faCarSide} />
            </div>
            <div className="furgoneta" aria-label="Furgoneta">
              <FontAwesomeIcon icon={faVanShuttle} />
            </div>
            <div className="camion" aria-label="Camión">
              <FontAwesomeIcon icon={faTruck} />
            </div>
            <div className="tractocamion" aria-label="Tractocamión">
              <FontAwesomeIcon icon={faTruckMoving} />
            </div>
          </div>
          <div className="name-inf">
            <div className="car">Coche</div>
            <div className="van">Furgoneta</div>
            <div className="camion">Camión</div>
            <div className="truck">Tractocamión</div>
          </div>
          <div className="price-inf">
            <div className="car">desde 30 €</div>
            <div className="van">desde 35 €</div>
            <div className="camion">desde 40 €</div>
            <div className="truck">desde 50 €</div>
          </div>
        </div>
      </div>
      <div className="banner-ofertas"></div>
      <div className="ubicacion">
        <div id="map-container">
          <iframe
            title="Google Maps Location"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2866.2327613808675!2d-2.8932515842212657!3d43.23445017913733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x87d7e97d1bc0d3b8!2sBizkaia%20Kalea%2C%2020%2C%2048450%20Etxebarri%2C%20Bizkaia%2C%20Espa%C3%B1a!5e0!3m2!1ses!2sus!4v1649128146254!5m2!1ses!2sus"
            allowFullScreen
            loading="lazy"
          />
        </div>

        <div className="directions-link">
          <a
            href="https://www.google.com/maps/dir/Current+Location/Bizkaia+Kalea,+20,+48450+Etxebarri,+Bizkaia"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Cómo llegar</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCardInfo;

