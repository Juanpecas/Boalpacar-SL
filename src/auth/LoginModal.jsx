
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const LoginModal = ({ show, handleClose, onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegister, setIsRegister] = useState(false); 
    const [errorText, setErrorText] = useState(""); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isRegister) {
            console.log("Registro con:", { email, password });
            
        } else {
            
            await onLogin(email, password);
            handleClose(); 
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
            </Modal.Body>
        </Modal>
    );
};

export default LoginModal;

