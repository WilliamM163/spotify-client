import React, { useEffect, useState } from "react";

// Importing Styles
import { primary_container } from '../App.module.css';
import style from './styles/Player.module.css';
import { useSelector } from "react-redux";

function Player() {
    // Code for Web Playback
    const { token } = useSelector((state) => state.accessToken);
    const [ player, setPlayer ] = useState(undefined);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: cb => { cb(token); },
                volume: 0.5
            });
            setPlayer(player);
            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
            });
            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });
            player.connect();
        };
    }, []);

    if (player !== undefined) {
        console.log(player);
    }

    return (
        <div className={`${primary_container} ${style.player}`}>
            Player:
        </div>
    );
}

export default Player;