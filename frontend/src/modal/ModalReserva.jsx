import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";

const ModalReserva = ({ closeModal }) => {
  const [form, setForm] = useState({
    nombre: "",
    modelo: "",
    email: "",
    telefono: "",
    fecha: "",
    hora: "",
    tipoLavado: "",
  });
  const [errors, setErrors] = useState({});
  const [horasReservadas, setHorasReservadas] = useState([]);
  const [precio, setPrecio] = useState(0);

  const navigate = useNavigate();

  const precios = {
    "Limpieza interior coche": 2000, // En centavos
    "Lavado exterior coche": 1500, // En centavos
    "Limpieza interior y exterior coche": 3000, // En centavos
    "Limpieza interior furgoneta": 2000, // En centavos
    "Limpieza exterior furgoneta": 2000, // En centavos
    "Limpieza interior y exterior furgoneta": 3500, // En centavos
    "Limpieza interior camion": 2000, // En centavos
    "Limpieza exterior camion": 5000, // En centavos
    "Limpieza interior y exterior camion": 6000, // En centavos
    "Petroleo motor": 6000, // En centavos
    "Tapicería coche o furgoneta": 15000, // En centavos
    "Tapicería de camion": 18000, // En centavos
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!form.nombre) nuevosErrores.nombre = "El nombre es obligatorio";
    if (!form.modelo) nuevosErrores.modelo = "El modelo es obligatorio";
    if (!form.telefono) nuevosErrores.telefono = "El teléfono es obligatorio";
    if (!form.fecha) nuevosErrores.fecha = "La fecha es obligatoria";
    if (!form.hora) nuevosErrores.hora = "La hora es obligatoria";
    if (!form.tipoLavado)
      nuevosErrores.tipoLavado = "Seleccione un tipo de lavado";

    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
      nuevosErrores.email = "Email inválido";
    }

    return nuevosErrores;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errores = validarFormulario();
    if (Object.keys(errores).length === 0) {
     
      setHorasReservadas([...horasReservadas, form.hora]);
      navigate("/checkout", { state: { form, precio } });
      closeModal();
    } else {
      setErrors(errores);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));

    
    if (name === "tipoLavado") {
      setPrecio(precios[value] || 0); 
    }
  };

  const horasDisponibles = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:30 PM",
    "05:00 PM",
    "05:30 PM",
    "06:00 PM",
  ].filter((hora) => !horasReservadas.includes(hora));

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modals" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closeModal}>
          &times;
        </button>
        <h6>Reserva de Servicios Boalpacar</h6>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
            />
            {errors.nombre && <p className="error">{errors.nombre}</p>}
          </div>
          <div className="form-group">
            <label>Modelo del coche</label>
            <input
              type="text"
              name="modelo"
              value={form.modelo}
              onChange={handleChange}
            />
            {errors.modelo && <p className="error">{errors.modelo}</p>}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Teléfono</label>
            <input
              type="tel"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
            />
            {errors.telefono && <p className="error">{errors.telefono}</p>}
          </div>
          <div className="form-group">
            <label>Fecha de Reserva</label>
            <input
              type="date"
              name="fecha"
              value={form.fecha}
              onChange={handleChange}
            />
            {errors.fecha && <p className="error">{errors.fecha}</p>}
          </div>
          <div className="form-group">
            <label>Hora de Reserva</label>
            <select name="hora" value={form.hora} onChange={handleChange}>
              <option value="">Seleccione una hora</option>
              {horasDisponibles.map((hora) => (
                <option key={hora} value={hora}>
                  {hora}
                </option>
              ))}
            </select>
            {errors.hora && <p className="error">{errors.hora}</p>}
          </div>
          <div className="form-group">
            <label>Tipo de Lavado</label>
            <select
              name="tipoLavado"
              value={form.tipoLavado}
              onChange={handleChange}
            >
              <option value="">Seleccione un tipo de lavado</option>
              <option value="Limpieza interior coche">
                Limpieza interior coche
              </option>
              <option value="Lavado exterior coche">
                Lavado exterior coche
              </option>
              <option value="Limpieza interior y exterior coche">
                Limpieza interior y exterior coche
              </option>
              <option value="Limpieza interior furgoneta">
                Limpieza interior furgoneta
              </option>
              <option value="Limpieza exterior furgoneta">
                Limpieza exterior furgoneta
              </option>
              <option value="Limpieza interior y exterior furgoneta">
                Limpieza interior y exterior furgoneta
              </option>
              <option value="Limpieza interior camion">
                Limpieza interior camion
              </option>
              <option value="Limpieza exterior camion">
                Limpieza exterior camion
              </option>
              <option value="Limpieza interior y exterior camion">
                Limpieza interior y exterior camion
              </option>
              <option value="Petroleo motor">Petroleo motor</option>
              <option value="Tapicería coche o furgoneta">
                Tapicería coche o furgoneta
              </option>
              <option value="Tapicería de camion">Tapicería de camion</option>
            </select>
            {errors.tipoLavado && <p className="error">{errors.tipoLavado}</p>}
          </div>
          <div className="form-group">
            <h4>Precio: €{(precio / 100).toFixed(2)}</h4>{" "}
            {/* Muestra el precio en euros */}
          </div>

          <div className="additional-info">
            <p>
              Tenga en cuenta que puede haber un costo adicional, ya que su
              vehículo será sometido a una validación profesional para
              garantizar un servicio de alta calidad.
            </p>
          </div>
          <div className="form-group">
            <button type="submit">Reservar</button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default ModalReserva;
