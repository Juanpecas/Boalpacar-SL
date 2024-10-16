// emailService.js
const nodemailer = require("nodemailer");

// Configura el transportador de nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.example.com", 
  port: 587, 
  secure: false, 
  auth: {
    user: "tu-email@example.com", 
    pass: "tu-contraseña", 
  },
});

// Función para enviar un correo
const sendReservationEmail = (reservationData, companyInfo) => {
  const mailOptions = {
    from: "tu-email@example.com", 
    to: reservationData.email, 
    subject: "Confirmación de Reserva",
    text: `
      Detalles de la Reserva:

      Nombre: ${reservationData.nombre}
      Modelo: ${reservationData.modelo}
      Teléfono: ${reservationData.telefono}
      Fecha: ${reservationData.fecha}
      Hora: ${reservationData.hora}
      Tipo de Lavado: ${reservationData.tipoLavado}
      Precio: $${reservationData.precio}

      Detalles de la Empresa:

      Nombre: ${companyInfo.name}
      Dirección: ${companyInfo.address}
      Teléfono: ${companyInfo.phone}
      Email: ${companyInfo.email}
    `,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendReservationEmail };
