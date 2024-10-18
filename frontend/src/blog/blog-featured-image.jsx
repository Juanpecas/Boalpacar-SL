import React from "react";
import PropTypes from "prop-types"; 

const BlogFeaturedImage = (props) => {
  if (!props.img) {
    return null; 
  }

  return (
    <div className="featured-image-wrapper">
      <img
        src={props.img}
        alt="Imagen destacada del blog" 
        style={{
          width: "100%", 
          height: "auto", 
        }}
        onError={(e) => {
          e.target.onerror = null; 
          e.target.src = "path/to/default/image.jpg"; 
        }}
      />
    </div>
  );
};


BlogFeaturedImage.propTypes = {
  img: PropTypes.string.isRequired, 
};

export default BlogFeaturedImage;
