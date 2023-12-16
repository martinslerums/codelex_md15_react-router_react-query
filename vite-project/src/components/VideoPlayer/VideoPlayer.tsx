
type VideoPlayerProps = {
    videoUrl: string;
} 

const VideoPlayer = ({ videoUrl }: VideoPlayerProps) => {

    // Check if videoUrl is not undefined and not an empty string
  if (!videoUrl || videoUrl.trim() === '') {
    return <div>No video URL provided</div>;
  }

  return (
    <div>
        <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoUrl.split('v=')[1]}`}
        title="YouTube video player"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoPlayer;