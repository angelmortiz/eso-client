import ReactPlayer from "react-player";

const VideoPlayer = ({ url }) => {
  return (
    <div className="video-responsive mx-auto mt-10 h-[360px] w-[640px]">
      <ReactPlayer url={url} controls width="100%" height="100%" />
    </div>
  );
};

export default VideoPlayer;
