import React from "react";
import PropTypes from "prop-types"; // Importa PropTypes

const BlogFeaturedImage = (props) => {
  if (!props.img) {
    return null; // Si no hay imagen, no se renderiza nada
  }

  return (
    <div className="featured-image-wrapper">
      <img
        src={props.img}
        alt="Imagen destacada del blog" // Añade un atributo alt
        style={{
          width: "100%", // Ajusta el tamaño de la imagen
          height: "auto", // Mantiene la proporción
        }}
        onError={(e) => {
          e.target.onerror = null; // Evita bucles infinitos
          e.target.src = "path/to/default/image.jpg"; // Ruta a una imagen predeterminada
        }}
      />
    </div>
  );
};

// Definir tipos de props
BlogFeaturedImage.propTypes = {
  img: PropTypes.string.isRequired, // La prop img debe ser una cadena
};

export default BlogFeaturedImage;
