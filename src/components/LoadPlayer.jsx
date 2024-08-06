import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function LoadPlayer() {
  const [player, setPlayer] = useState(null);
  const token = useSelector((state) => state.accessToken.token);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.onSpotifyWebPlaybackSDKReady = () => {
        const newPlayer = new window.Spotify.Player({
          name: "Web Playback SDK Quick Start Player",
          getOAuthToken: (cb) => {
            cb(token);
          },
          volume: 0.5,
        });
        setPlayer(newPlayer);

        newPlayer.addListener("initialization_error", ({ message }) => {
          console.error(message);
        });
        newPlayer.addListener("authentication_error", ({ message }) => {
          console.error(message);
        });
        newPlayer.addListener("account_error", ({ message }) => {
          console.error(message);
        });
        newPlayer.addListener("playback_error", ({ message }) => {
          console.error(message);
        });

        newPlayer.connect();
      };
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [token]);

  return <div>{/* Add UI elements to control the player if needed */}</div>;
}

export default LoadPlayer;
