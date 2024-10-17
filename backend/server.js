require("dotenv").config();
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose(); // Importar SQLite
const helmet = require("helmet");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet()); // Seguridad adicional

// Configuración de SQLite
const db = new sqlite3.Database(process.env.DB_NAME || "database.db", (err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err.message);
  } else {
    console.log("Conectado a la base de datos SQLite");
  }
});

// Mapeo de tipos de lavado a precios (en centavos)
const preciosLavado = {
  limpiezaInteriorCoche: 2000,
  exteriorCoche: 1500,
  limpiezaInteriorYExteriorCoche: 3000,
  limpiezaFurgonetaInterior: 2000,
  limpiezaFurgonetaExterior: 2000,
  limpiezaFurgonetaCompleto: 3500,
  limpiezaCamionInterior: 2000,
  limpiezaCamionExterior: 5000,
  limpiezaCamionCompleto: 6000,
  petroleMotor: 6000,
  tapiceriaCocheFurgoneta: 15000,
  tapiceriaCamion: 18000,
};

// Endpoint para crear el Payment Intent
app.post("/create-payment-intent", async (req, res) => {
  const { tipoLavado } = req.body;
  const amount = preciosLavado[tipoLavado];

  // Verificar si el tipo de lavado es válido
  if (!amount) {
    return res.status(400).json({ error: "Tipo de lavado no válido." });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "eur", // Moneda en euros
    });

    res.status(200).send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error al crear el Payment Intent:", error);
    res.status(500).send({ error: error.message });
  }
});

// Endpoint para guardar los datos de la reserva
app.post("/api/reservas", async (req, res) => {
  const {
    nombre,
    modelo,
    email,
    telefono,
    fecha,
    hora,
    tipoLavado,
    precio,
    paymentIntentId,
  } = req.body;

  // Validar campos obligatorios
  if (
    !nombre ||
    !modelo ||
    !telefono ||
    !fecha ||
    !hora ||
    !tipoLavado ||
    !paymentIntentId
  ) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios." });
  }

  try {
    // Confirmar que el pago fue exitoso
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({ message: "El pago no fue exitoso." });
    }

    // Crear la consulta SQL para insertar la reserva
    const query = `
      INSERT INTO reservas (nombre, modelo, email, telefono, fecha, hora, tipoLavado, precio) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Ejecutar la consulta de SQLite
    db.run(
      query,
      [nombre, modelo, email, telefono, fecha, hora, tipoLavado, precio],
      function (err) {
        if (err) {
          console.error("Error al guardar la reserva:", err);
          return res
            .status(500)
            .json({ message: "Error al guardar la reserva." });
        }

        res.status(200).json({
          message: "Reserva guardada con éxito.",
          reservaId: this.lastID, // Obtiene el último ID insertado
        });
      }
    );
  } catch (error) {
    console.error("Error al verificar el pago:", error);
    return res.status(500).json({ message: "Error al verificar el pago." });
  }
});

// Iniciar el servidor en el puerto 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
