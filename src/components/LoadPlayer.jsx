import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function LoadPlayer() {
  const [player, setPlayer] = useState(null);
  const token = useSelector((state) => state.accessToken.token);


  useEffect(() => {
    // Dynamically load the Spotify script
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    document.head.appendChild(script);

    // Ensure the script is loaded before creating the player
    script.onload = () => {
      window.onSpotifyWebPlaybackSDKReady = () => {
        const newPlayer = new window.Spotify.Player({
          name: 'Web Playback SDK Quick Start Player',
          getOAuthToken: (cb) => { cb(token); },
          volume: 0.5
        });
        setPlayer(newPlayer);

        // Error handling
        newPlayer.addListener('initialization_error', ({ message }) => { 
          console.error(message);
        });
        newPlayer.addListener('authentication_error', ({ message }) => { 
          console.error(message);
        });
        newPlayer.addListener('account_error', ({ message }) => { 
          console.error(message);
        });
        newPlayer.addListener('playback_error', ({ message }) => { 
          console.error(message);
        });

        // Connect to the player
        newPlayer.connect();
      };
    };

    // Cleanup: Remove the script when the component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, []); // Empty dependency array ensures this runs once on mount

  // ... (Rest of your component logic to control the player)
}

export default LoadPlayer;