import { useSelector } from "react-redux";
import { primary_container } from "../App.module.css";
import style from "./styles/Player.module.css";

function Player() {
  // Code for Web Playback
  const currentTrack = useSelector((state) => state.currentTrack);
  const accessToken = useSelector((state) => state.accessToken.token);

  if (!currentTrack || !accessToken) {
    return null; // Or show a placeholder
  }

  let album_art = "/icons/track_icon.svg";
  let song_title = "Unknown Track";
  let album_name = "Unknown Album";
  let artist_names = "Unknown Artist";

  if (currentTrack.id) {
    album_art = currentTrack.album.images[1].url;
    song_title = currentTrack.name;
    album_name = currentTrack.album.name;
    artist_names = currentTrack.artists.map((artist) => artist.name).join(", ");
  }

  return (
    <div className={`${primary_container} ${style.player}`}>
      <img src={album_art} width="100" height="100" />
      <div className={style.track_info}>
        <h2>{song_title}</h2>
        <p className={style.album_name}>{album_name}</p>
        <p className={style.artist_names}>{artist_names}</p>
      </div>
      <div className={style.controls}>
        <img src="/icons/skip_previous.svg" title="Go back a track" />
        <img src="/icons/play_track.svg" title="Play track" />
        <img src="/icons/skip_next.svg" title="Skip to next track" />
      </div>
      <div className={style.audio_bar}>Audio Bar</div>
    </div>
  );
}

export default Player;
