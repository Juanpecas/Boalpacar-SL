import React, { useEffect, useState } from "react";
import { setCookie, getCookie } from "./CookieManager"; 

const CookieConsentBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const cookiesAccepted = getCookie("cookiesAccepted"); 
    if (!cookiesAccepted) {
      setShowBanner(true); 
    }
  }, []);

  
  const acceptCookies = () => {
    setCookie("cookiesAccepted", "true", { expires: 365 }); 
    setShowBanner(false); 
  };

 
  const rejectCookies = () => {
    setCookie("cookiesAccepted", "false", { expires: 365 }); 
    setShowBanner(false); 
  };

  
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
