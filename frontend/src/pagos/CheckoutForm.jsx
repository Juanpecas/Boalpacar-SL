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
  const [pagarEnEstablecimiento, setPagarEnEstablecimiento] = useState(false); // Nuevo estado
  const [loading, setLoading] = useState(false); // Estado para carga

  const location = useLocation();
  const reservationData = location.state?.form;
  const price = location.state?.precio;

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
          "http://localhost:5000/create-payment-intent",
          {
            amount: price * 100,
          }
        );
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        setError("Error al crear el Payment Intent.");
      }
    };

    if (price) {
      createPaymentIntent();
    }
  }, [price]);

  const realizarReserva = async (datosReserva) => {
    const { tipoLavado } = datosReserva;

    const response = await fetch(
      "http://localhost:5000/create-payment-intent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: price * 100 }),
      }
    );

    const { clientSecret } = await response.json();
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
          "http://localhost:5000/api/reservas",
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
        setSuccess("¡Reserva guardada con éxito!");
      }
    } catch (error) {
      setError("Error al procesar el pago. Inténtalo de nuevo más tarde.");
      setSuccess(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setError(null); // Resetear error antes de procesar
    setSuccess(null); // Resetear éxito antes de procesar
    setLoading(true); // Activar indicador de carga

    await realizarReserva(reservationData);
    setLoading(false); // Desactivar indicador de carga
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Información de Reserva</h2>

      <h4>Detalles de la Empresa</h4>
      <p>Nombre: {companyInfo.name}</p>
      <p>Dirección: {companyInfo.address}</p>
      <p>Teléfono: {companyInfo.phone}</p>
      <p>Email: {companyInfo.email}</p>

      <h4>Detalles de la Reserva</h4>
      <p>Nombre: {reservationData.nombre}</p>
      <p>Modelo: {reservationData.modelo}</p>
      <p>Email: {reservationData.email}</p>
      <p>Teléfono: {reservationData.telefono}</p>
      <p>Fecha: {reservationData.fecha}</p>
      <p>Hora: {reservationData.hora}</p>
      <p>Tipo de Lavado: {reservationData.tipoLavado}</p>
      <p>Precio: ${price}</p>

      {/* Opción para pagar en el establecimiento */}
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

      {/* Renderizar el elemento de la tarjeta solo si el usuario no ha elegido pagar en el establecimiento */}
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
