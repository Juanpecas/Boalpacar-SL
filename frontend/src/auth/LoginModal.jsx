// LoginModal.js
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { auth, provider, signInWithPopup } from "../firebase/firebase"; // Asegúrate de que la ruta es correcta

const LoginModal = ({ show, handleClose, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegister) {
      console.log("Registro con:", { email, password });
      // Aquí puedes manejar la lógica de registro si es necesario
    } else {
      // Inicio de sesión con email y password
      await onLogin(email, password);
      handleClose();
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Usuario logueado con Google:", user);
      handleClose(); // Cierra el modal si el inicio de sesión es exitoso
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      setErrorText("Error al iniciar sesión con Google. Intenta nuevamente.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="login-modal">
      <Modal.Header closeButton>
        <Modal.Title>
          {isRegister ? "Crear cuenta" : "Iniciar sesión"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {errorText && <div className="error-text">{errorText}</div>}
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese su correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-input"
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="btn-submit">
            {isRegister ? "Crear cuenta" : "Iniciar sesión"}
          </Button>
          <Button
            variant="link"
            onClick={() => setIsRegister(!isRegister)}
            className="btn-switch"
          >
            {isRegister
              ? "¿Ya tienes cuenta? Inicia sesión"
              : "¿No tienes cuenta? Regístrate"}
          </Button>
        </Form>

        {/* Botón para iniciar sesión con Google */}
        <Button
          variant="outline-danger"
          className="btn-google-login"
          onClick={handleGoogleSignIn}
          style={{ marginTop: "10px", width: "100%" }}
        >
          Iniciar sesión con Google
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
