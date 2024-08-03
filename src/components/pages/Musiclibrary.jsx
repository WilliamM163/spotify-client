import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPlaylistsThunk } from "../../store";

function MusicLibrary() {
  const dispatch = useDispatch();
  const playlists = useSelector((state) => state.playlists.results);
  const isLoading = useSelector((state) => state.playlists.isLoading);
  const error = useSelector((state) => state.playlists.error);

  useEffect(() => {
    dispatch(loadPlaylistsThunk());
  }, [dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Music Library</h1>
      <ul>
        {playlists.length > 0 ? (
          playlists.map((playlist) => (
            <li key={playlist.id} style={{ marginBottom: "20px" }}>
              <a
                href={playlist.external_urls?.spotify}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "black" }}
              >
                <img
                  src={playlist.images?.[0]?.url || "default-image-url"} // Replace 'default-image-url' with a placeholder image if needed
                  alt={playlist.name}
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                  }} // Adjust size as needed
                />
                <h2>{playlist.name}</h2>
              </a>
            </li>
          ))
        ) : (
          <p>No playlists found.</p>
        )}
      </ul>
    </div>
  );
}

export default MusicLibrary;

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loadPlaylistsThunk } from "../../store";

// const MusicLibrary = () => {
//   const dispatch = useDispatch();
//   const playlists = useSelector((state) => state.playlists.results);
//   const isLoading = useSelector((state) => state.playlists.isLoading);
//   const error = useSelector((state) => state.playlists.error);

//   useEffect(() => {
//     dispatch(loadPlaylistsThunk());
//   }, [dispatch]);

//   const handleAddToPlaylist = async (playlistId, track) => {
//     if (!token) {
//       // Handle the case where the token is not available
//       console.error("No access token available");
//       return;
//     }

//     const trackUri = track.uri; // Use the track URI

//     try {
//       await addTrackToPlaylist(playlistId, trackUri, token);
//       alert("Track added to playlist successfully!");
//     } catch (error) {
//       console.error("Error adding track to playlist:", error);
//       alert("Failed to add track to playlist");
//     }
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <h2>Your Playlists</h2>
//       {playlists.items.map((playlist) => (
//         <div key={playlist.id}>
//           <h3>{playlist.name}</h3>
//           <ul>
//             {playlist.tracks.items.map((track) => (
//               <li key={track.track.id}>
//                 {track.track.name}
//                 <button
//                   onClick={() => handleAddToPlaylist(playlist.id, track.track)}
//                 >
//                   Add to Playlist
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MusicLibrary;
