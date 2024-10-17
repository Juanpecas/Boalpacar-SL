# Boalpcar-SL
Boalpacar SL Ecomerce Interface

## Lavado de Coches - Servicios de Lavado Rápido y Fácil

---

## Descripción del Proyecto

Este proyecto es una plataforma web para ofrecer y solicitar **servicios de lavado de coches** de manera rápida, sencilla y eficiente. Los usuarios pueden seleccionar el tipo de lavado que prefieren, ver los precios correspondientes, y hacer su reserva o compra en línea. La página también permite realizar pagos seguros y gestionar las reservas de servicios.

---

## Características Principales

- **Reservas y Solicitud de Servicios**: Los usuarios pueden solicitar diferentes tipos de lavado para coches, furgonetas, y camiones, así como servicios especializados como la limpieza de tapicerías y motores.
  
- **Tipos de Lavado Disponibles**:
  - Limpieza interior de coches
  - Limpieza exterior de coches
  - Limpieza completa de coches (interior y exterior)
  - Lavado de furgonetas (interior, exterior o completo)
  - Lavado de camiones (interior, exterior o completo)
  - Limpieza de tapicerías
  - Lavado de motores

- **Sistema de Reservas**: Se permite elegir la fecha y hora en la que el usuario desea realizar el servicio, garantizando la disponibilidad del personal para cada solicitud.

- **Pago Seguro**: Integración con **Stripe** para permitir pagos seguros y confiables en línea mediante tarjeta de crédito o débito.

- **Gestión de Reservas**: Los usuarios pueden ver, actualizar y cancelar sus reservas. La plataforma confirma automáticamente el pago antes de procesar la reserva.

---

## Tecnologías Utilizadas

- **Frontend**:
  - React.js: Para la creación de una interfaz interactiva y dinámica.
  - CSS/SCSS: Para el diseño y la apariencia visual de la aplicación.
  - React Dropzone: Para la carga de imágenes, como el logo del servicio y la imagen de referencia del vehículo.
  
- **Backend**:
  - **Node.js & Express**: Backend para gestionar las solicitudes, reservas y procesamiento de pagos.
  - **SQLITE3**: Base de datos para almacenar información de usuarios, reservas y servicios disponibles.
  - **Stripe**: Servicio de procesamiento de pagos en línea.
  
- **Seguridad**:
  - **Helmet.js**: Para configurar cabeceras HTTP y mejorar la seguridad.
  - **CORS**: Configuración para manejar solicitudes HTTP desde diferentes dominios.

---

## Cómo Usar la Plataforma

1. **Selecciona un Servicio**: Desde la página principal, elige el tipo de lavado que deseas. Puedes seleccionar diferentes servicios según el tipo de vehículo (coche, furgoneta, camión) y tus necesidades (limpieza interior, exterior, completa, etc.).

2. **Realiza la Reserva**: Introduce tus datos, elige la fecha y la hora, y confirma la reserva.

3. **Pago Seguro**: Realiza el pago directamente desde la plataforma mediante la integración con Stripe, ademas de se habilita un boton para pagar en el establecimiento comercial.

4. **Recibe Confirmación**: Una vez confirmado el pago, recibirás un correo electrónico con los detalles de tu reserva.

## Contribución

Si deseas contribuir al proyecto, puedes seguir los siguientes pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-caracteristica`).
3. Realiza los cambios necesarios y haz commit (`git commit -m 'Agregar nueva característica'`).
4. Haz push a la rama (`git push origin feature/nueva-caracteristica`).
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la **Licencia MIT**. Puedes ver más detalles en el archivo `LICENSE`.

## Contacto

Si tienes alguna duda o sugerencia, puedes contactarnos a través de:

- **Email**: soporte@Boalpacar.com
- **Teléfono**: +123 456 789
- **Página Web**: en construccion

---
