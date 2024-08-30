// loadplayer.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function LoadPlayer() {
  const [player, setPlayer] = useState(null);
  const [videoId, setVideoId] = useState(null);
  const token = useSelector((state) => state.accessToken.token); // Replace with YouTube API Key
  const currentVideo = useSelector((state) => state.currentVideo); // Replace with YouTube video state

  useEffect(() => {
    const loadYouTubePlayer = () => {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.head.appendChild(script);

      window.onYouTubeIframeAPIReady = () => {
        const newPlayer = new window.YT.Player("youtube-player", {
          height: "390",
          width: "640",
          videoId: videoId,
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
          },
        });
        setPlayer(newPlayer);
      };
    };

    const onPlayerReady = (event) => {
      event.target.playVideo();
    };

    const onPlayerStateChange = (event) => {
      // Handle state changes like play, pause, etc.
    };

    loadYouTubePlayer();

    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, [videoId]);

  useEffect(() => {
    if (player && currentVideo) {
      player.loadVideoById(currentVideo.id);
    }
  }, [currentVideo, player]);

  return (
    <div>
      <div id="youtube-player"></div>
    </div>
  );
}

export default LoadPlayer;
