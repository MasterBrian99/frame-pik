import MediaCard from "@/app/main/components/media-card";
import { MediaT } from "@/types/media-type";
import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [media, setMedia] = useState<MediaT[]>([]);
  useEffect(() => {
    const fetchMedia = async () => {
      // Simulating an API call with a delay
      const newMedia: MediaT[] = Array.from({ length: 10 }, (_, i) => {
        const isVideo = Math.random() > 0.7; // 30% chance of being a video
        const width = Math.floor(Math.random() * 200 + 200);
        const height = Math.floor(Math.random() * 200 + 200);
        return {
          index: media.length + i + 1,
          id: media.length + i + 1,
          type: isVideo ? "video" : "image",
          url: isVideo
            ? `https://picsum.photos/${height}/${width}` // Example video URL
            : `https://picsum.photos/${height}/${width}`,
          username: `user${media.length + i + 1}`,
          width,
          height,
        };
      });
      setMedia((prevMedia) => [...prevMedia, ...newMedia]);
    };

    fetchMedia();
  }, []);
  return (
    <div>
      <div className="columns-2xs">
        {media.map((m, index) => (
          <MediaCard
            key={index}
            id={m.id}
            type={m.type}
            url={m.url}
            username={m.username}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
