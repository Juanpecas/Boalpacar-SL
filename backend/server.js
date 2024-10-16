const express = require("express");
const stripe = require("stripe")(
  "sk_test_51QAGC6EJxV1jBn9lELUJla6AcjRHWGiYnH9WOVlfxAdLmt8ae2AcSiunjo6SjsZasWntjO5x688vU1lNeBPhNgH500MtrQMycR"
);
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de MySQL
const db = mysql.createConnection({
  host: "localhost", // Cambia esto si usas un servicio de base de datos remoto
  user: "juan", // Usuario de MySQL
  password: "Qwaszx15***", // Contraseña de MySQL
  database: "reservas", // Nombre de tu base de datos
});

// Conectar a MySQL
db.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
    return;
  }
  console.log("Conectado a la base de datos MySQL");
});

// Mapeo de tipos de lavado a precios
const preciosLavado = {
  limpiezaInteriorCoche: 2000, // $20.00
  exteriorCoche: 1500, // $15.00
  limpiezaInteriorYExteriorCoche: 3000, // $30.00
  limpiezaFurgonetaInterior: 2000, // $20.00
  limpiezaFurgonetaExterior: 2000, // $20.00
  limpiezaFurgonetaCompleto: 3500, // $35.00
  limpiezaCamionInterior: 2000, // $20.00
  limpiezaCamionExterior: 5000, // $50.00
  limpiezaCamionCompleto: 6000, // $60.00
  petroleMotor: 6000, // $60.00
  tapiceriaCocheFurgoneta: 15000, // $150.00
  tapiceriaCamion: 18000, // $180.00
};

// Endpoint para crear el Payment Intent
app.post("/create-payment-intent", async (req, res) => {
  const { tipoLavado } = req.body; // Obtener el tipo de lavado del cuerpo de la solicitud
  const amount = preciosLavado[tipoLavado]; // Obtener el monto correspondiente

  // Verificar si el tipo de lavado es válido
  if (!amount) {
    return res.status(400).send({ error: "Tipo de lavado no válido." });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
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

  // Validar que todos los campos requeridos están presentes
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
      .json({ message: "Todos los campos son obligatorios" });
  }

  // Confirmar que el pago fue exitoso antes de guardar la reserva
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({ message: "El pago no fue exitoso" });
    }

    // Crear la consulta SQL para insertar los datos
    const query = `
      INSERT INTO reservas (nombre, modelo, email, telefono, fecha, hora, tipoLavado, precio) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Ejecutar la consulta
    db.query(
      query,
      [nombre, modelo, email, telefono, fecha, hora, tipoLavado, precio],
      (err, result) => {
        if (err) {
          console.error("Error al guardar la reserva:", err);
          return res
            .status(500)
            .json({ message: "Error al guardar la reserva" });
        }

        res.status(200).json({
          message: "Reserva guardada con éxito",
          reservaId: result.insertId,
        });
      }
    );
  } catch (error) {
    console.error("Error al verificar el pago:", error);
    return res.status(500).json({ message: "Error al verificar el pago" });
  }
});

// Iniciar el servidor en el puerto 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
