import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faSignOutAlt,
  faDoorOpen,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import LoginModal from "../auth/LoginModal";

const AuthButton = ({ handleSuccessfulLogin, handleSuccessfulLogout }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();

 
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("loggedInStatus");
    setIsLoggedIn(loggedInStatus === "LOGGED_IN");
  }, []);

  
  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post(
        "https://api.devcamp.space/sessions",
        {
          client: {
            email,
            password,
          },
        },
        { withCredentials: true }
      );

      if (response.data.status === "created") {
        localStorage.setItem("loggedInStatus", "LOGGED_IN"); 
        setIsLoggedIn(true);
        handleSuccessfulLogin(); 
        setShowLoginModal(false);
        console.log("Usuario logueado exitosamente");

        
        navigate("/AdminPanelPage");
      } else {
        setErrorText("Correo electrónico o contraseña incorrectos.");
      }
    } catch (error) {
      handleLoginError(error); 
    }
  };

 
  const handleLoginError = (error) => {
    if (error.response) {
      setErrorText("Correo electrónico o contraseña incorrectos.");
    } else if (error.request) {
      setErrorText("No se recibió respuesta del servidor.");
    } else {
      setErrorText("Error al iniciar sesión. Intenta nuevamente.");
    }
    console.error("Error de inicio de sesión:", error);
  };

  
  const handleSignOut = async () => {
    try {
      const response = await axios.delete("https://api.devcamp.space/logout", {
        withCredentials: true,
      });

      if (response.status === 200) {
        localStorage.setItem("loggedInStatus", "NOT_LOGGED_IN"); 
        setIsLoggedIn(false);
        handleSuccessfulLogout(); 
        console.log("Usuario deslogueado exitosamente");
        navigate("/inicio"); 
      }
    } catch (error) {
      console.log("Error al cerrar sesión", error);
    }
  };

  
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div className="right-side">
      {isLoggedIn ? (
        <div
          className="btn-admin-cerrar"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <button
            onClick={handleSignOut}
            className="btn"
            style={{ border: "none", background: "transparent" }}
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            {isHovering && (
              <>
                <FontAwesomeIcon
                  icon={faDoorOpen}
                  style={{ marginLeft: "10px" }}
                />
                <span style={{ marginLeft: "5px" }}>Salir</span>
              </>
            )}
          </button>
        </div>
      ) : (
        <>
          <span
            style={{ marginRight: "4px", cursor: "pointer" }}
            onClick={() => setShowLoginModal(true)}
          >
            Iniciar
          </span>
          <FontAwesomeIcon
            icon={faSignInAlt}
            onClick={() => setShowLoginModal(true)}
            className="fa-sign-in-alt"
          />
        </>
      )}
      <LoginModal
        show={showLoginModal}
        handleClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />
      {errorText && <div className="error-text">{errorText}</div>}
    </div>
  );
};

export default AuthButton;
