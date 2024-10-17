# Backend para Procesamiento de Pagos y Gestión de Reservas

Este es un backend construido con **Node.js** y **Express** para procesar pagos mediante **Stripe** y almacenar reservas en una base de datos **MySQL**. Además, utiliza **CORS** y **Helmet** para seguridad y admite diferentes tipos de servicios de lavado de vehículos con precios específicos.

## Características

- Procesa pagos utilizando **Stripe**.
- Almacena reservas de servicios de lavado de vehículos en una base de datos **MySQL**.
- Seguridad adicional mediante **Helmet** y configuraciones de **Content Security Policy (CSP)**.
- **API RESTful** con endpoints para creación de pagos y gestión de reservas.

## Requisitos

Para ejecutar este proyecto necesitas tener instalados los siguientes componentes:

- **Node.js** (v14+)
- **MySQL**
- **Stripe Account** (para obtener las claves de Stripe)

## Instalación

1. Clona este repositorio en tu máquina local:

   
   git clone https://github.com/tu-usuario/tu-repositorio.git

2. Navega al directorio del proyecto:

    cd backend
3. Instala las dependencias con npm:

    npm install
4. Crea un archivo .env en la raíz del proyecto con la siguiente estructura y agrega tus claves y credenciales:

    # Stripe Keys
    STRIPE_SECRET_KEY=sk_test_XXXXXXXXXXXXXXXXXXXXXXXX

    # MySQL Database Configuration
    DB_HOST=localhost
    DB_USER=tu_usuario_mysql
    DB_PASSWORD=tu_contraseña_mysql
    DB_NAME=reservas

## Nota importante:
    
- No olvides agregar .env al archivo .gitignore para evitar exponer claves sensibles en tu repositorio


5.  Crea la tabla de reservas en tu base de datos MySQL. Puedes ejecutar el siguiente comando SQL:

    sql

    CREATE TABLE reservas (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(255) NOT NULL,
      modelo VARCHAR(255) NOT NULL,
      email VARCHAR(255),
      telefono VARCHAR(20) NOT NULL,
      fecha DATE NOT NULL,
      hora TIME NOT NULL,
      tipoLavado VARCHAR(255) NOT NULL,
      precio DECIMAL(10, 2) NOT NULL
    );
## Uso
    Ejecuta el servidor con el siguiente comando:

    node server.js

    El servidor se iniciará en el puerto 5000 o el puerto definido en la variable de entorno PORT.

## Endpoints
1. Crear un Payment Intent
    POST /create-payment-intent
    Este endpoint crea un Payment Intent con Stripe para el servicio de lavado solicitado.

### Cuerpo de la solicitud:

    {
    "tipoLavado": "limpiezaInteriorCoche"
    }
### Respuesta exitosa:

    {
      "clientSecret": "pi_1XXXXXX_secret_XXXXXXXXXX"
    }

2. Guardar una reserva
 * POST /api/reservas
    Este endpoint guarda la reserva en la base de datos después de verificar que el pago fue exitoso.

 *  Cuerpo de la solicitud:

    {
      "nombre": "Juan Pérez",
      "modelo": "Toyota Corolla",
      "email": "juan@example.com",
      "telefono": "123456789",
      "fecha": "2023-01-01",
      "hora": "14:00",
      "tipoLavado": "limpiezaInteriorCoche",
      "precio": 2000,
      "paymentIntentId": "pi_1XXXXXX_secret_XXXXXXXXXX"
    }
 * Respuesta exitosa:

    {
      "message": "Reserva guardada con éxito.",
      "reservaId": 1
    }
## Seguridad

Este backend usa las siguientes medidas de seguridad:

- **Helmet**: Agrega varias cabeceras de seguridad HTTP.
- **Content Security Policy (CSP)**: Restringe las fuentes de scripts y contenido para prevenir ataques XSS.
- **CORS**: Permite solicitudes entre dominios solo desde fuentes permitidas.

## Dependencias

- **Express**: Framework de Node.js para construir la API.
- **Stripe**: Procesamiento de pagos.
- **MySQL**: Base de datos para almacenar las reservas.
- **CORS**: Middleware para habilitar CORS.
- **Helmet**: Mejoras de seguridad para la API.

## Contribuciones

Si quieres contribuir a este proyecto:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature-nueva-funcionalidad`).
3. Haz tus cambios y realiza commits.
4. Envía un pull request.

## Licencia

Este proyecto está bajo la licencia MIT.
