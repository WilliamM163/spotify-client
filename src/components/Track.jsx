// src/components/Track.jsx
import React from "react";

const Track = ({ track }) => {
  const { id, snippet } = track;
  const videoId = id.videoId;
  const title = snippet.title;
  const thumbnail = snippet.thumbnails.default.url;

  return (
    <div>
      <img src={thumbnail} alt={title} />
      <h3>{title}</h3>
      <a
        href={`https://www.youtube.com/watch?v=${videoId}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Listen on YouTube
      </a>
    </div>
  );
};

export { Track };
