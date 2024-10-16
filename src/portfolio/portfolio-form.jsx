// src/pages/PortfolioForm.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import DropzoneComponent from "react-dropzone-component";

const PortfolioForm = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Coches",
    position: "",
    url: "",
    thumb_image: "",
    banner_image: "",
    logo: "",
    editMode: false,
    apiUrl: "https://juanito.devcamp.space/portfolio/portfolio_items",
    apiAction: "post",
  });

  const thumbRef = useRef();
  const bannerRef = useRef();
  const logoRef = useRef();

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
        banner_image_url,
        logo_url,
      } = props.portfolioToEdit;

      props.clearPortfolioToEdit();

      setFormData((prevState) => ({
        ...prevState,
        id: id,
        name: name || "",
        description: description || "",
        category: category || "Coches",
        position: position || "",
        url: url || "",
        editMode: true,
        apiUrl: `https://juanito.devcamp.space/portfolio/portfolio_items/${id}`,
        apiAction: "patch",
        thumb_image_url: thumb_image_url || "",
        banner_image_url: banner_image_url || "",
        logo_url: logo_url || "",
      }));
    }
  }, [props.portfolioToEdit, props]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDrop = (type) => (file) => {
    setFormData((prevState) => ({ ...prevState, [type]: file }));
  };

  const deleteImage = async (imageType) => {
    try {
      await axios.delete(
        `https://api.devcamp.space/portfolio/delete-portfolio-image/${formData.id}?image_type=${imageType}`,
        { withCredentials: true }
      );
      setFormData((prevState) => ({ ...prevState, [`${imageType}_url`]: "" }));
    } catch (error) {
      console.error("deleteImage error", error);
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

    if (formData.banner_image) {
      form.append("portfolio_item[banner_image]", formData.banner_image);
    }

    if (formData.logo) {
      form.append("portfolio_item[logo]", formData.logo);
    }

    return form;
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
        thumb_image: "",
        logo: "",
        editMode: false,
        apiUrl: "https://juanito.devcamp.space/portfolio/portfolio_items",
        apiAction: "post",
      });

      [thumbRef, bannerRef, logoRef].forEach((ref) => {
        ref.current.dropzone.removeAllFiles();
      });
    } catch (error) {
      console.error("portfolio form handleSubmit error", error);
    }
  };

  const componentConfig = {
    iconFiletypes: [".jpg", ".png"],
    showFiletypeIcon: true,
    postUrl: "https://httpbin.org/post",
  };

  const djsConfig = {
    addRemoveLinks: true,
    maxFiles: 1,
  };

  return (
    <form onSubmit={handleSubmit} className="portfolio-form-wrapper">
      <div className="two-column">
        <input
          type="text"
          name="name"
          placeholder="Portfolio Item Name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div className="two-column">
        <input
          type="text"
          name="position"
          placeholder="Position"
          value={formData.position}
          onChange={handleChange}
        />

        <select
          name="category"
          placeholder="Categoria"
          value={formData.category}
          onChange={handleChange}
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
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className="image-uploaders">
        {formData.thumb_image_url && formData.editMode ? (
          <div className="portfolio-manager-image-wrapper">
            <img src={formData.thumb_image_url} alt="Thumbnail" />
            <div className="image-removal-link">
              <a onClick={() => deleteImage("thumb_image")}>Remove file</a>
            </div>
          </div>
        ) : (
          <DropzoneComponent
            ref={thumbRef}
            config={componentConfig}
            djsConfig={djsConfig}
            eventHandlers={{ addedfile: handleDrop("thumb_image") }}
          >
            <div className="dz-message">Imagen servicio</div>
          </DropzoneComponent>
        )}

        {formData.logo_url && formData.editMode ? (
          <div className="portfolio-manager-image-wrapper">
            <img src={formData.logo_url} alt="Logo" />
            <div className="image-removal-link">
              <a onClick={() => deleteImage("logo")}>Remove file</a>
            </div>
          </div>
        ) : (
          <DropzoneComponent
            ref={logoRef}
            config={componentConfig}
            djsConfig={djsConfig}
            eventHandlers={{ addedfile: handleDrop("logo") }}
          >
            <div className="dz-message">imagen precio</div>
          </DropzoneComponent>
        )}
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
