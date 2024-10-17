import Cookies from "js-cookie";

/**
 * Configura una cookie.
 *
 * @param {string} name - El nombre de la cookie.
 * @param {string} value - El valor de la cookie.
 * @param {Object} [options={}] - Opciones para la cookie.
 * @param {number} [options.expires] - Número de días antes de que la cookie caduque.
 * @param {string} [options.path] - Ruta para la cual la cookie es válida.
 * @param {string} [options.domain] - Dominio para el cual la cookie es válida.
 */
export const setCookie = (name, value, options = {}) => {
  const cookieOptions = {
    ...options,
    secure: true, // Asegúrate de que la cookie sea segura
    sameSite: "None", // Asegúrate de que sea compatible con solicitudes entre sitios
  };

  // Si se proporciona un número de días, configúralo como la fecha de caducidad
  if (options.expires) {
    const date = new Date();
    date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000);
    cookieOptions.expires = date;
  }

  Cookies.set(name, value, cookieOptions);
};

/**
 * Obtiene el valor de una cookie.
 *
 * @param {string} name - El nombre de la cookie.
 * @returns {string|null} - El valor de la cookie o null si no existe.
 */
export const getCookie = (name) => {
  return Cookies.get(name) || null; // Devuelve null si la cookie no existe
};

/**
 * Elimina una cookie.
 *
 * @param {string} name - El nombre de la cookie.
 * @param {Object} [options={}] - Opciones para la eliminación de la cookie (ruta y dominio).
 */
export const removeCookie = (name, options = {}) => {
  Cookies.remove(name, options);
};
