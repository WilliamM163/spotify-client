// player.jsx
import React from "react";
import { useSelector } from "react-redux";
import { primary_container } from "../App.module.css";
import style from "./styles/Player.module.css";

function Player() {
  const currentVideo = useSelector((state) => state.currentVideo);

  if (!currentVideo) {
    return null;
  }

  let video_thumbnail = "/icons/video_placeholder.svg";
  let video_title = "Unknown Video";
  let channel_name = "Unknown Channel";

  if (currentVideo.id) {
    video_thumbnail = currentVideo.thumbnail.url;
    video_title = currentVideo.title;
    channel_name = currentVideo.channelTitle;
  }

  return (
    <div className={`${primary_container} ${style.player}`}>
      <img src={video_thumbnail} width="100" height="100" />
      <div className={style.track_info}>
        <h2>{video_title}</h2>
        <p className={style.album_name}>{channel_name}</p>
      </div>
      <div className={style.controls}>
        <img src="/icons/skip_previous.svg" title="Previous video" />
        <img src="/icons/play_track.svg" title="Play video" />
        <img src="/icons/skip_next.svg" title="Next video" />
      </div>
      <div className={style.audio_bar}>Video Progress</div>
    </div>
  );
}

export default Player;
