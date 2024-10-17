import React, { Component } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone"; // Cambia la importación aquí
import ReactHtmlParser from "html-react-parser";
import "dropzone/dist/dropzone.css"; // Mantener el estilo de Dropzone original

import RichTextEditor from "../forms/rich-text-editor";
import PropTypes from "prop-types";

const BlogForm = (props) => {
  const [title, setTitle] = React.useState(props.blog?.title || "");
  const [blog_status, setBlogStatus] = React.useState(
    props.blog?.blog_status || ""
  );
  const [content, setContent] = React.useState(props.blog?.content || "");
  const [featured_image, setFeaturedImage] = React.useState(null);
  const [apiUrl, setApiUrl] = React.useState(
    "https://juanito.devcamp.space/portfolio/portfolio_blogs"
  );
  const [apiAction, setApiAction] = React.useState("post");

  React.useEffect(() => {
    if (props.editMode) {
      setApiUrl(
        `https://juanito.devcamp.space/portfolio/portfolio_blogs/${props.blog.id}`
      );
      setApiAction("patch");
    }
  }, [props.editMode, props.blog]);

  const onDrop = (acceptedFiles) => {
    console.log("Archivo aceptado:", acceptedFiles); // Verifica el archivo aceptado
    setFeaturedImage(acceptedFiles[0]); // Establece el archivo arrastrado
  };

  const buildForm = () => {
    const formData = new FormData();
    formData.append("portfolio_blog[title]", title);
    formData.append("portfolio_blog[blog_status]", blog_status);
    formData.append("portfolio_blog[content]", content);

    if (featured_image) {
      formData.append("portfolio_blog[featured_image]", featured_image);
    }

    return formData;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios({
        method: apiAction,
        url: apiUrl,
        data: buildForm(),
        withCredentials: true,
      });

      if (featured_image) {
        setFeaturedImage(null); // Restablecer el estado de la imagen
      }

      setTitle("");
      setBlogStatus("");
      setContent("");

      if (props.editMode) {
        props.handleUpdateFormSubmission(response.data.portfolio_blog);
      } else {
        props.handleSuccessfullFormSubmission(response.data.portfolio_blog);
      }
    } catch (error) {
      console.error("handleSubmit for blog error", error);
      alert("There was an error submitting the form. Please try again.");
    }
  };

  const deleteImage = (imageType) => {
    axios
      .delete(
        `https://api.devcamp.space/portfolio/delete-portfolio-blog-image/${props.blog.id}?image_type=${imageType}`,
        { withCredentials: true }
      )
      .then(() => {
        props.handleFeaturedImageDelete();
      })
      .catch((error) => {
        console.log("deleteImage error", error);
      });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <form onSubmit={handleSubmit} className="blog-form-wrapper">
      <div className="two-column">
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          placeholder="Blog Title"
          value={title}
        />
        <input
          type="text"
          onChange={(e) => setBlogStatus(e.target.value)}
          name="blog_status"
          placeholder="Blog status"
          value={blog_status}
        />
      </div>

      <div className="one-column">
        <RichTextEditor
          handleRichTextEditorChange={setContent}
          editMode={props.editMode}
          contentToEdit={props.editMode ? props.blog.content : null}
        />
      </div>

      <div className="image-uploaders">
        {props.editMode && props.blog.featured_image_url ? (
          <div className="portfolio-manager-image-wrapper">
            <img src={props.blog.featured_image_url} alt="Featured" />
            <div className="image-removal-link">
              <a onClick={() => deleteImage("featured_image")}>Remove file</a>
            </div>
          </div>
        ) : (
          <div {...getRootProps({ className: "dz-message" })}>
            <input {...getInputProps()} />
            <p>
              Arrastra y suelta una imagen aquí, o haz clic para seleccionar
              una.
            </p>
          </div>
        )}

        {/* Mostrar la imagen cargada */}
        {featured_image && (
          <div className="portfolio-manager-image-wrapper">
            <img src={URL.createObjectURL(featured_image)} alt="Cargada" />
          </div>
        )}
      </div>

      <button className="btn">Save</button>
    </form>
  );
};

BlogForm.propTypes = {
  blog: PropTypes.object.isRequired,
  editMode: PropTypes.bool.isRequired,
  handleUpdateFormSubmission: PropTypes.func.isRequired,
  handleSuccessfullFormSubmission: PropTypes.func.isRequired,
  handleFeaturedImageDelete: PropTypes.func.isRequired,
};

export default BlogForm;
