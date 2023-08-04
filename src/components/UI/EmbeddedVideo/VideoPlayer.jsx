import ReactPlayer from "react-player";

const VideoPlayer = ({ url }) => {
  return (
    <div
      className="video-responsive mx-auto mt-5 md:mt-8"
      style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}
    >
      <ReactPlayer
        url={url}
        controls
        style={{ position: "absolute", top: 0, left: 0 }}
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default VideoPlayer;
