import React from "react";
import { useDispatch } from "react-redux";

import { loadPlaylistsThunk } from "../../store";

function MusicLibrary() {
  const dispatch = useDispatch();

  function loadPlaylists() {
    dispatch(loadPlaylistsThunk());
  }

  loadPlaylists();
  return (
    <div>
      <p>Music Library Page</p>
    </div>
  );
}

export default MusicLibrary;
