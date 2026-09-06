import { useRef, useEffect } from "react";

interface VideoPlayerProps {
  video: {
    _id: string;
    videotitle: string;
    filepath: string;
  };
}

export default function VideoPlayer({ video }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoPath = String(video?.filepath || "")
    .replace(/^uploads[\\/]/, "")
    .replace(/\\/g, "/");

  return (
    <div className="aspect-video bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        className="w-full h-full"
        controls
        poster={`/placeholder.svg?height=480&width=854`}
      >
        <source
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${videoPath}`}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
