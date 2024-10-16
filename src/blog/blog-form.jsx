import React, { Component } from "react";
import axios from "axios";
import DropzoneComponent from "react-dropzone-component";
import ReactHtmlParser from "html-react-parser";
import "react-dropzone-component/styles/filepicker.css";
import "dropzone/dist/dropzone.css";

import RichTextEditor from "../forms/rich-text-editor";
import PropTypes from "prop-types";

export default class BlogForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.blog?.id || "",
      title: props.blog?.title || "",
      blog_status: props.blog?.blog_status || "",
      content: props.blog?.content || "",
      featured_image: "",
      apiUrl: "https://juanito.devcamp.space/portfolio/portfolio_blogs",
      apiAction: "post",
    };

    this.featuredImageRef = React.createRef();
  }

  static propTypes = {
    blog: PropTypes.object.isRequired,
    editMode: PropTypes.bool.isRequired,
    handleUpdateFormSubmission: PropTypes.func.isRequired,
    handleSuccessfullFormSubmission: PropTypes.func.isRequired,
    handleFeaturedImageDelete: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if (this.props.editMode) {
      this.setState({
        apiUrl: `https://juanito.devcamp.space/portfolio/portfolio_blogs/${this.props.blog.id}`,
        apiAction: "patch",
      });
    }
  }

  componentConfig() {
    return {
      iconFiletypes: [".jpg", ".png"],
      showFiletypeIcon: true,
      postUrl: "https://httpbin.org/post",
    };
  }

  djsConfig() {
    return {
      addRemoveLinks: true,
      maxFiles: 1,
    };
  }

  handleFeaturedImageDrop = () => ({
    addedfile: (file) => this.setState({ featured_image: file }),
  });

  handleRichTextEditorChange = (content) => {
    this.setState({ content });
  };

  buildForm() {
    const { title, blog_status, content, featured_image } = this.state;
    let formData = new FormData();
    formData.append("portfolio_blog[title]", title);
    formData.append("portfolio_blog[blog_status]", blog_status);
    formData.append("portfolio_blog[content]", content);

    if (featured_image) {
      formData.append("portfolio_blog[featured_image]", featured_image);
    }

    return formData;
  }

  handleSubmit = async (event) => {
    event.preventDefault(); 
    try {
      const response = await axios({
        method: this.state.apiAction,
        url: this.state.apiUrl,
        data: this.buildForm(),
        withCredentials: true,
      });

      if (this.state.featured_image) {
        this.featuredImageRef.current.dropzone.removeAllFiles();
      }

      this.setState({
        title: "",
        blog_status: "",
        content: "",
        featured_image: "",
      });

      if (this.props.editMode) {
        this.props.handleUpdateFormSubmission(response.data.portfolio_blog);
      } else {
        this.props.handleSuccessfullFormSubmission(
          response.data.portfolio_blog
        );
      }
    } catch (error) {
      console.error("handleSubmit for blog error", error);
      alert("There was an error submitting the form. Please try again."); 
    }
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  deleteImage = (imageType) => {
    axios
      .delete(
        `https://api.devcamp.space/portfolio/delete-portfolio-blog-image/${this.props.blog.id}?image_type=${imageType}`,
        { withCredentials: true }
      )
      .then(() => {
        this.props.handleFeaturedImageDelete();
      })
      .catch((error) => {
        console.log("deleteImage error", error);
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="blog-form-wrapper">
        <div className="two-column">
          <input
            type="text"
            onChange={this.handleChange}
            name="title"
            placeholder="Blog Title"
            value={this.state.title}
          />
          <input
            type="text"
            onChange={this.handleChange}
            name="blog_status"
            placeholder="Blog status"
            value={this.state.blog_status}
          />
        </div>

        <div className="one-column">
          <RichTextEditor
            handleRichTextEditorChange={this.handleRichTextEditorChange}
            editMode={this.props.editMode}
            contentToEdit={this.props.editMode ? this.props.blog.content : null}
          />
        </div>

        <div className="image-uploaders">
          {this.props.editMode && this.props.blog.featured_image_url ? (
            <div className="portfolio-manager-image-wrapper">
              <img src={this.props.blog.featured_image_url} alt="Featured" />
              <div className="image-removal-link">
                <a onClick={() => this.deleteImage("featured_image")}>
                  Remove file
                </a>
              </div>
            </div>
          ) : (
            <DropzoneComponent
              ref={this.featuredImageRef}
              config={this.componentConfig()}
              djsConfig={this.djsConfig()}
              eventHandlers={this.handleFeaturedImageDrop()}
            >
              <div className="dz-message">Featured Image</div>
            </DropzoneComponent>
          )}
        </div>

        <button className="btn">Save</button>
      </form>
    );
  }
}
