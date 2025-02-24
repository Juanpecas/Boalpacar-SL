import React, { Component } from "react";
import axios from "axios";
import parse from "html-react-parser";
import DOMPurify from "dompurify"; 

import BlogForm from "../blog/blog-form";
import BlogFeaturedImage from "../blog/blog-featured-image";

export default class BlogDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentId: this.props.match.params.slug,
      blogItem: {},
      editMode: false,
    };

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleFeaturedImageDelete = this.handleFeaturedImageDelete.bind(this);
    this.handleUpdateFormSubmission =
      this.handleUpdateFormSubmission.bind(this);
  }

  handleUpdateFormSubmission(blog) {
    this.setState({
      blogItem: blog,
      editMode: false,
    });
  }

  handleFeaturedImageDelete() {
    this.setState({
      blogItem: {
        featured_image_url: "",
      },
    });
  }

  handleEditClick() {
    if (this.props.loggedInStatus === "LOGGED_IN") {
      this.setState({ editMode: true });
    }
  }

  getBlogItem() {
    axios
      .get(
        `https://juanito.devcamp.space/portfolio/portfolio_blogs/${this.state.currentId}`
      )
      .then((response) => {
        this.setState({
          blogItem: response.data.portfolio_blog,
        });
      })
      .catch((error) => {
        console.log("getBlogItem error", error);
      });
  }

  componentDidMount() {
    this.getBlogItem();
  }

  render() {
    const { title, content, featured_image_url } = this.state.blogItem;

    const cleanContent = DOMPurify.sanitize(content); // Sanitize the content

    const contentManager = () => {
      if (this.state.editMode) {
        return (
          <BlogForm
            handleFeaturedImageDelete={this.handleFeaturedImageDelete}
            handleUpdateFormSubmission={this.handleUpdateFormSubmission}
            editMode={this.state.editMode}
            blog={this.state.blogItem}
          />
        );
      } else {
        return (
          <div className="content-container">
            <h1 onClick={this.handleEditClick}>{title}</h1>
            <BlogFeaturedImage img={featured_image_url} />
            <div className="content">{parse(cleanContent)}</div>{" "}
            {/* Use sanitized content */}
          </div>
        );
      }
    };

    return <div className="blog-container">{contentManager()}</div>;
  }
}
