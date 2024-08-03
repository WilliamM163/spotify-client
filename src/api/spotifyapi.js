const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

export async function fetchUserProfile(token) {
  const response = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 403) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }

  const data = await response.json();
  return data;
}

export async function refreshToken(refreshToken) {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(CLIENT_ID + ":" + CLIENT_SECRET)}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh token");
  }

  const data = await response.json();
  return data;
}

export async function searchSpotify(query, token) {
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      query
    )}&type=track`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status === 403) {
    throw new Error("Access token expired or invalid");
  }

  if (!response.ok) {
    throw new Error("Failed to search Spotify");
  }

  const data = await response.json();
  return data;
}
export async function addTrackToPlaylist(trackId, token, playlistId) {
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=spotify:track:${trackId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status === 403) {
    throw new Error("Access token expired or invalid");
  }

  if (!response.ok) {
    throw new Error("Failed to add track to playlist");
  }

  return response.json();
}

// fetching user playlist function
export async function getUserPlaylists(token) {
  if (!token) {
    throw new Error("No access token provided");
  }

  const response = await fetch("https://api.spotify.com/v1/me/playlists", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (response.status === 401) {
    throw new Error("Unauthorized: Invalid access token");
  }

  if (!response.ok) {
    throw new Error("Failed to fetch playlists");
  }

  return response.json();
}

/**
 * Spotify API Helper Functions
 *
 * This file contains helper functions to interact with the Spotify API.
 * It includes functions to fetch search results and handle authorization headers.
 */
