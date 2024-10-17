require("dotenv").config();
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
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
  "Limpieza interior coche": 2000, // En centavos
  "Lavado exterior coche": 1500, // En centavos
  "Limpieza interior y exterior coche": 3000, // En centavos
  "Limpieza interior furgoneta": 2000, // En centavos
  "Limpieza exterior furgoneta": 2000, // En centavos
  "Limpieza interior y exterior furgoneta": 3500, // En centavos
  "Limpieza interior camion": 2000, // En centavos
  "Limpieza exterior camion": 5000, // En centavos
  "Limpieza interior y exterior camion": 6000, // En centavos
  "Petrole motor": 6000, // En centavos
  "Tapicería coche o furgoneta": 15000, // En centavos
  "Tapicería de camion": 18000, // En centavos
};

// Endpoint para crear el Payment Intent
app.post("/create-payment-intent", async (req, res) => {
  const { tipoLavado } = req.body;

  // Verificar si el tipo de lavado es válido
  if (!tipoLavado || !preciosLavado.hasOwnProperty(tipoLavado)) {
    return res.status(400).json({ error: "Tipo de lavado no válido." });
  }

  const amount = preciosLavado[tipoLavado];

  console.log(
    `Creando Payment Intent para ${tipoLavado} con el monto: €${(
      amount / 100
    ).toFixed(2)}`
  );

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "eur",
    });

    res.status(200).send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error al crear el Payment Intent:", error);
    return res.status(400).send({
      error:
        "Error al crear el Payment Intent. Asegúrese de que la solicitud sea válida.",
    });
  }
});

// Endpoint para guardar los datos de la reserva
// Endpoint para guardar los datos de la reserva
// Endpoint para guardar los datos de la reserva
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
          return res.status(500).json({
            message: "Error al guardar la reserva en la base de datos.",
          });
        }

        res.status(200).json({
          message: "Reserva guardada con éxito.",
          reservaId: this.lastID,
        });
      }
    );
  } catch (error) {
    console.error("Error al verificar el pago:", error);
    return res.status(500).json({
      message: "Error al verificar el pago.",
      error: error.message, // Agrega el mensaje de error aquí
    });
  }
});

// Iniciar el servidor en el puerto 5000
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
