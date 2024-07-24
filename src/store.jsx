import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authenticate, refreshAccessToken } from './api/login_api.js';
import { searchSpotify } from './api/spotifyapi.js';

export const accessTokenThunk = createAsyncThunk(
    'accessToken/get',
    async (_, { rejectWithValue }) => {
        let accessToken = localStorage.getItem("access_token");
        const tokenExpiryTime = localStorage.getItem("token_expiry_time");

        if (!accessToken || (tokenExpiryTime && Date.now() > tokenExpiryTime)) {
            accessToken = await authenticate(); // Authenticate if no token or expired token
        }

        if (!accessToken) {
            return rejectWithValue("Failed to get access token");
        }
        return accessToken;
    }
);

export const searchThunk = createAsyncThunk(
    'search/query',
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
            console.log('Search Results:', results); // Log results for debugging
            return results;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const accessTokenSlice = createSlice({
    name: 'accessToken',
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
    }
});

const searchSlice = createSlice({
    name: 'search',
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
                // Ensure results are properly set
                state.results = action.payload.tracks ? action.payload.tracks.items : [];
            })
            .addCase(searchThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});


export const store = configureStore({
    reducer: {
        accessToken: accessTokenSlice.reducer,
        search: searchSlice.reducer,
    }
});
/**
 * Redux Store Configuration
 * 
 * This file configures the Redux store for managing the application's state.
 * It includes slices for handling access tokens and search results.
 * The `accessTokenThunk` is used to fetch and refresh the Spotify access token.
 * The `searchThunk` is used to fetch search results from the Spotify API.
 */


