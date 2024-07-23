import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSearchResults } from './spotifyapi'; 

export const searchTracks = createAsyncThunk(
    'search/searchTracks',
    async (query, { rejectWithValue }) => {
        try {
            const response = await fetchSearchResults(query);
            if (response.ok) {
                const data = await response.json();
                return data; // Adjust this to fit the actual API response
            } else {
                return rejectWithValue('Failed to fetch search results');
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

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
            .addCase(searchTracks.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(searchTracks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.results = action.payload;
            })
            .addCase(searchTracks.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export default searchSlice.reducer;
