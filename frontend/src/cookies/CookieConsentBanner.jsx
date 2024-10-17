import React, { useEffect, useState } from "react";
import { setCookie, getCookie } from "./CookieManager"; // Ajusta la ruta según tu estructura de carpetas

const CookieConsentBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const cookiesAccepted = getCookie("cookiesAccepted"); // Verifica si el usuario ya ha aceptado cookies
    if (!cookiesAccepted) {
      setShowBanner(true); // Muestra el banner si no hay consentimiento
    }
  }, []);

  // Función para aceptar cookies
  const acceptCookies = () => {
    setCookie("cookiesAccepted", "true", { expires: 365 }); // Establece la cookie con consentimiento
    setShowBanner(false); // Oculta el banner
  };

  // Función para rechazar cookies
  const rejectCookies = () => {
    setCookie("cookiesAccepted", "false", { expires: 365 }); // Establece la cookie con rechazo
    setShowBanner(false); // Oculta el banner
  };

  // Si no hay banner que mostrar, retorna null
  if (!showBanner) {
    return null;
  }

  return (
    <div className="cookie-banner" role="alert">
      <p>
        Este sitio utiliza cookies para mejorar la experiencia del usuario.
        <button onClick={acceptCookies} aria-label="Aceptar cookies">
          Aceptar
        </button>
        <button onClick={rejectCookies} aria-label="Rechazar cookies">
          Rechazar
        </button>
      </p>
    </div>
  );
};

export default CookieConsentBanner;
