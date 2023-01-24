import React from "react";
import PropTypes from "prop-types";
import styles from "./YouTubeEmbed.module.css";

const YouTubeEmbed = ({ embedId }) => (
  <div className={styles['video-responsive']}>
    <iframe
      width="853"
      height="480"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

YouTubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default YouTubeEmbed;