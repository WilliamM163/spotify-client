import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import { authenticate, refreshAccessToken } from "./api/login_api";
import {
  searchSpotify,
  addTrackToPlaylist,
  getUserPlaylists,
} from "./api/spotifyapi";

// AccessTokenThunk
export const accessTokenThunk = createAsyncThunk(
  "accessToken/get",
  async (_, { rejectWithValue }) => {
    let accessToken = localStorage.getItem("access_token");
    const tokenExpiryTime = localStorage.getItem("token_expiry_time");

    if (!accessToken || (tokenExpiryTime && Date.now() > tokenExpiryTime)) {
      accessToken = await refreshAccessToken(); // Refresh token if expired

      if (!accessToken) {
        accessToken = await authenticate(); // Authenticate if no token or failed to refresh
      }
    }

    if (!accessToken) {
      return rejectWithValue("Failed to get access token");
    }
    return accessToken;
  }
);

// Search Thunk
export const searchThunk = createAsyncThunk(
  "search/query",
  async (query, { getState, rejectWithValue, dispatch }) => {
    const state = getState();
    let token = state.accessToken.token;
    const tokenExpiryTime = localStorage.getItem("token_expiry_time");

    if (!token || (tokenExpiryTime && Date.now() > tokenExpiryTime)) {
      // Refresh token if it's expired
      await dispatch(accessTokenThunk());
      token = getState().accessToken.token;
    }

    if (!token) {
      return rejectWithValue("No access token available");
    }

    try {
      const results = await searchSpotify(query, token);
      return results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Load Playlists Thunk
export const loadPlaylistsThunk = createAsyncThunk(
  "playlists/loadPlaylists",
  async () => {
    try {
      const response = await getUserPlaylists();
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        return rejectWithValue("Failed to fetch playlists");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Access Token Slice
const accessTokenSlice = createSlice({
  name: "accessToken",
  initialState: {
    token: localStorage.getItem("access_token") || null,
    isLoading: false,
    failed: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(accessTokenThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(accessTokenThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
        state.failed = false;
      })
      .addCase(accessTokenThunk.rejected, (state) => {
        state.isLoading = false;
        state.failed = true;
      });
  },
});

// Add To Playlist Thunk
// Update the thunk to fetch user's playlists and then add the track to a playlist
export const addTrackToPlaylistThunk = createAsyncThunk(
  "playlists/addTrack",
  async ({ trackId, token }, { rejectWithValue }) => {
    try {
      const playlists = await getUserPlaylists(token);
      const playlistId = playlists.items[0].id; // Adjust logic as needed
      const response = await addTrackToPlaylist(trackId, token, playlistId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Search Slice
const searchSlice = createSlice({
  name: "search",
  initialState: {
    results: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.results = action.payload.tracks
          ? action.payload.tracks.items
          : [];
      })
      .addCase(searchThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Update playlistsSlice to handle addTrackToPlaylistThunk
const playlistsSlice = createSlice({
  name: "playlists",
  initialState: {
    results: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadPlaylistsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadPlaylistsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.results = action.payload;
      })
      .addCase(loadPlaylistsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addTrackToPlaylistThunk.fulfilled, (state, action) => {
        state.results.push(action.payload);
      })
      .addCase(addTrackToPlaylistThunk.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// Current Track Slice
const currentTrackSlice = createSlice({
  name: "currentTrack",
  initialState: {},
  reducers: {
    newTrack(_, action) {
      return action.payload;
    },
  },
});
export const { newTrack } = currentTrackSlice.actions;

export const store = configureStore({
  reducer: {
    accessToken: accessTokenSlice.reducer,
    search: searchSlice.reducer,
    playlists: playlistsSlice.reducer,
    currentTrack: currentTrackSlice.reducer,
  },
});

// Summary of New Updates:
// - Added logic to store and check token_expiry_time in localStorage in accessTokenThunk
// - Updated searchThunk to refresh access token if expired before making a search request

//  * Redux Store Configuration
//  * This file configures the Redux store for managing the application's state.
//  * It includes slices for handling access tokens and search results.
//  * The `accessTokenThunk` is used to fetch and refresh the Spotify access token.
//  * The `searchThunk` is used to fetch search results from the Spotify API.
//  */

// Summary of New Updates:
// - Added logic to store and check token_expiry_time in localStorage in accessTokenThunk
// - Updated searchThunk to refresh access token if expired before making a search request

//  * Redux Store Configuration
//  * This file configures the Redux store for managing the application's state.
//  * It includes slices for handling access tokens and search results.
//  * The `accessTokenThunk` is used to fetch and refresh the Spotify access token.
//  * The `searchThunk` is used to fetch search results from the Spotify API.
//  */
