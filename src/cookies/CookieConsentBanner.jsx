
import React, { useEffect, useState } from "react";

const CookieConsentBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");
    if (!cookiesAccepted) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setShowBanner(false);
    
  };

  const rejectCookies = () => {
    localStorage.setItem("cookiesAccepted", "false");
    setShowBanner(false);
  };

  if (!showBanner) {
    return null; 
  }

  return (
    <div className="cookie-banner">
      <p>
        Este sitio utiliza cookies para mejorar la experiencia del usuario.
        <button onClick={acceptCookies}>Aceptar</button>
        <button onClick={rejectCookies}>Rechazar</button>
      </p>
    </div>
  );
};

export default CookieConsentBanner;
