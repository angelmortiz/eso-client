import React from "react";
import PropTypes from "prop-types";

const YouTubeEmbed = ({ embedId }) => (
  <div className="video-responsive w-120 mt-4 h-64 rounded-lg sm:mt-4 sm:h-40 sm:w-72">
    <iframe
      width="853"
      height="480"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
      className="h-full w-full"
    />
  </div>
);

YouTubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
};

export default YouTubeEmbed;
