import React, { Component } from "react";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import PropTypes from "prop-types";

import BlogForm from "./blog-form";
import BlogFeaturedImage from "./blog-featured-image";

export default class BlogDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentId: this.props.match.params.slug,
      blogItem: {},
      editMode: false,
    };
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    loggedInStatus: PropTypes.string.isRequired,
  };

  componentDidMount() {
    this.getBlogItem();
  }

  async getBlogItem() {
    try {
      const response = await axios.get(
        `https://juanito.devcamp.space/portfolio/portfolio_blogs/${this.state.currentId}`
      );
      this.setState({ blogItem: response.data.portfolio_blog });
    } catch (error) {
      console.error("getBlogItem error", error);
      
    }
  }

  handleUpdateFormSubmission = (blog) => {
    this.setState({ blogItem: blog, editMode: false });
  };

  handleFeaturedImageDelete = () => {
    this.setState({
      blogItem: { ...this.state.blogItem, featured_image_url: "" },
    });
  };

  handleEditClick = () => {
    if (this.props.loggedInStatus === "LOGGED_IN") {
      this.setState({ editMode: true });
    }
  };

  renderContent() {
    const { title, content, featured_image_url } = this.state.blogItem;

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
          <div className="content">{ReactHtmlParser(content)}</div>
        </div>
      );
    }
  }

  render() {
    return <div className="blog-container">{this.renderContent()}</div>;
  }
}
