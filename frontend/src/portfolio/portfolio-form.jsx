// src/pages/PortfolioForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone"; // Aquí importamos useDropzone

const FileUploader = ({ onDrop, label, existingImageUrl }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      onDrop(acceptedFiles);
    },
    multiple: false,
  });

  return (
    <div>
      {existingImageUrl ? (
        <div className="portfolio-manager-image-wrapper">
          <img src={existingImageUrl} alt={label} />
          <div className="image-removal-link">
            <a onClick={() => onDrop(null)}>Remove file</a>
          </div>
        </div>
      ) : (
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <p>{label}</p>
        </div>
      )}
    </div>
  );
};

const PortfolioForm = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Coches",
    position: "",
    url: "",
    thumb_image: null,
    logo: null,
    editMode: false,
    apiUrl: "https://juanito.devcamp.space/portfolio/portfolio_items",
    apiAction: "post",
    thumb_image_url: "", // Inicializa el campo de URL de la miniatura
    logo_url: "", // Inicializa el campo de URL del logo
  });

  useEffect(() => {
    if (Object.keys(props.portfolioToEdit).length > 0) {
      const {
        id,
        name,
        description,
        category,
        position,
        url,
        thumb_image_url,
        logo_url,
      } = props.portfolioToEdit;

      props.clearPortfolioToEdit();

      setFormData({
        ...formData,
        id,
        name: name || "",
        description: description || "",
        category: category || "Coches",
        position: position || "",
        url: url || "",
        editMode: true,
        apiUrl: `https://juanito.devcamp.space/portfolio/portfolio_items/${id}`,
        apiAction: "patch",
        thumb_image_url: thumb_image_url || "", // Asegúrate de que esto esté bien
        logo_url: logo_url || "", // Asegúrate de que esto esté bien
      });
    }
  }, [props.portfolioToEdit]);

  const handleDrop = (file, type) => {
    setFormData((prevState) => ({
      ...prevState,
      [type]: file ? file[0] : null, // Establecer el archivo cargado
      [`${type}_url`]: file ? URL.createObjectURL(file[0]) : "", // Establecer la URL de la imagen para mostrarla
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios({
        method: formData.apiAction,
        url: formData.apiUrl,
        data: buildForm(),
        withCredentials: true,
      });

      if (formData.editMode) {
        props.handleEditFormSubmission();
      } else {
        props.handleNewFormSubmission(response.data.portfolio_item);
      }

      setFormData({
        name: "",
        description: "",
        category: "Coches",
        position: "",
        thumb_image: null,
        logo: null,
        editMode: false,
        apiUrl: "https://juanito.devcamp.space/portfolio/portfolio_items",
        apiAction: "post",
        thumb_image_url: "", // Restablecer después del envío
        logo_url: "", // Restablecer después del envío
      });
    } catch (error) {
      console.error("portfolio form handleSubmit error", error);
    }
  };

  const buildForm = () => {
    const form = new FormData();
    form.append("portfolio_item[name]", formData.name);
    form.append("portfolio_item[description]", formData.description);
    form.append("portfolio_item[url]", formData.url);
    form.append("portfolio_item[category]", formData.category);
    form.append("portfolio_item[position]", formData.position);

    if (formData.thumb_image) {
      form.append("portfolio_item[thumb_image]", formData.thumb_image);
    }

    if (formData.logo) {
      form.append("portfolio_item[logo]", formData.logo);
    }

    return form;
  };

  return (
    <form onSubmit={handleSubmit} className="portfolio-form-wrapper">
      <div className="two-column">
        <input
          type="text"
          name="name"
          placeholder="Portfolio Item Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div className="two-column">
        <input
          type="text"
          name="position"
          placeholder="Position"
          value={formData.position}
          onChange={(e) =>
            setFormData({ ...formData, position: e.target.value })
          }
        />
        <select
          name="category"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="select-element"
        >
          <option value="Coches">Coches</option>
          <option value="Furgonetas">Furgonetas</option>
          <option value="Camiones">Camiones</option>
          <option value="Petroleo Motores">Petroleo Motores</option>
          <option value="Tapicerias">Tapicerias</option>
          <option value="Mecanica Rapida">Mecanica Rapida</option>
        </select>
      </div>

      <div className="one-column">
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </div>

      <div className="image-uploaders">
        <FileUploader
          onDrop={(file) => handleDrop(file, "thumb_image")}
          label="Imagen servicio"
          existingImageUrl={formData.thumb_image_url} // Asegúrate de usar la URL correcta aquí
        />

        <FileUploader
          onDrop={(file) => handleDrop(file, "logo")}
          label="Imagen precio"
          existingImageUrl={formData.logo_url} // Asegúrate de usar la URL correcta aquí
        />
      </div>

      <div>
        <button className="btn-save" type="submit">
          Save
        </button>
      </div>
    </form>
  );
};

export default PortfolioForm;
