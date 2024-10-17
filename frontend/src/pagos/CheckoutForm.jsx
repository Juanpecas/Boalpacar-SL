import React, { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [pagarEnEstablecimiento, setPagarEnEstablecimiento] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const reservationData = location.state?.form;
  const price = location.state?.precio; // Se asume que esto ya está en céntimos

  const navigate = useNavigate();

  const companyInfo = {
    name: "Boalpacar SL",
    address: "Calle Vizcaya Número 20",
    phone: "****",
    email: "**",
  };

  if (!reservationData || !price) {
    return (
      <div>
        <h2>Error: Datos de reserva no disponibles.</h2>
        <button onClick={() => navigate(-1)}>Regresar</button>
      </div>
    );
  }

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5001/create-payment-intent",
          {
            tipoLavado: reservationData.tipoLavado, // Aseguramos que este valor coincida con el backend
          }
        );
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        setError("Error al crear el Payment Intent: " + error.message);
        console.error("Error en createPaymentIntent:", error);
      }
    };

    if (reservationData && reservationData.tipoLavado) {
      createPaymentIntent();
    }
  }, [reservationData]);

  const realizarReserva = async (datosReserva) => {
    const cardElement = elements.getElement(CardElement);

    try {
      const resultado = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (resultado.error) {
        console.error("Error al confirmar el pago:", resultado.error);
        setError(resultado.error.message);
        setSuccess(null);
      } else {
        const paymentIntentId = resultado.paymentIntent.id;
        const reservaResponse = await fetch(
          "http://localhost:5001/api/reservas",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...datosReserva, paymentIntentId }),
          }
        );


        const reservaData = await reservaResponse.json();
        console.log("Reserva guardada:", reservaData);
        if (reservaResponse.ok) {
          setSuccess("¡Reserva guardada con éxito!");
        } else {
          setError(reservaData.message || "Error al guardar la reserva.");
        }
      }
    } catch (error) {
      setError("Error al procesar el pago. Inténtalo de nuevo más tarde.");
      console.error("Error en realizarReserva:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return; // Aseguramos que clientSecret está listo antes de proceder
    }

    setError(null);
    setSuccess(null);
    setLoading(true);

    await realizarReserva(reservationData);
    setLoading(false);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Información de Reserva</h2>
      {/* Información de la empresa */}
      <h4>Detalles de la Empresa</h4>
      <p>Nombre: {companyInfo.name}</p>
      <p>Dirección: {companyInfo.address}</p>
      <p>Teléfono: {companyInfo.phone}</p>
      <p>Email: {companyInfo.email}</p>
      {/* Información de la reserva */}
      <h4>Detalles de la Reserva</h4>
      <p>Nombre: {reservationData.nombre}</p>
      <p>Modelo: {reservationData.modelo}</p>
      <p>Email: {reservationData.email}</p>
      <p>Teléfono: {reservationData.telefono}</p>
      <p>Fecha: {reservationData.fecha}</p>
      <p>Hora: {reservationData.hora}</p>
      <p>Tipo de Lavado: {reservationData.tipoLavado}</p>
      <p>Precio: €{(price / 100).toFixed(2)}</p>{" "}
      {/* Mostrar el precio correctamente */}
      <div>
        <input
          type="checkbox"
          id="pagarEnEstablecimiento"
          checked={pagarEnEstablecimiento}
          onChange={() => setPagarEnEstablecimiento(!pagarEnEstablecimiento)}
        />
        <label htmlFor="pagarEnEstablecimiento">
          Pagar en el establecimiento
        </label>
      </div>
      {!pagarEnEstablecimiento && <CardElement className="card-element" />}
      <div className="button-group">
        <button
          type="submit"
          disabled={!stripe || pagarEnEstablecimiento || loading}
        >
          {loading
            ? "Procesando..."
            : pagarEnEstablecimiento
            ? "Confirmar Reserva"
            : "Pagar"}
        </button>
        <button type="button" onClick={handleCancel} className="button-cancel">
          Cancelar
        </button>
      </div>
      {error && <div className="error-text">{error}</div>}
      {success && <div className="success-text">{success}</div>}
    </form>
  );
};

export default CheckoutForm;
