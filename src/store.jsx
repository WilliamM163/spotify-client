import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {  refreshAccessToken } from './login_api.js';
import {authenticate} from './login_api.js';
export const accessTokenThunk = createAsyncThunk(
    'accessToken/get',
    async (_, { rejectWithValue }) => {
        let accessToken = localStorage.getItem("access_token");
        const tokenExpiryTime = localStorage.getItem("token_expiry_time");

        if (!accessToken) {
            accessToken = await authenticate(); // Authenticate if no token
        } else if (tokenExpiryTime && Date.now() > tokenExpiryTime) {
            // If token is expired, refresh it
            accessToken = await refreshAccessToken();
        }

        if (!accessToken) {
            return rejectWithValue("Failed to get access token");
        }
        return accessToken;
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

export const store = configureStore({
    reducer: {
        accessToken: accessTokenSlice.reducer,
    }
});

// SUMMARY ->

// Explanation of store.jsx Updates
// Here's the explanation for the updates made in store.jsx:

// Import Statements:

// authenticate and refreshAccessToken are imported from login_api.js to handle the authentication and token refresh logic.
// Thunk Action (accessTokenThunk):

// Role: Handles the process of fetching the access token.
// Behavior:
// Checks if an access token is present in localStorage.
// If the token is not found, it calls authenticate() to obtain a new token.
// If the token is found but expired (based on tokenExpiryTime in localStorage), it calls refreshAccessToken() to refresh the token.
// If no valid token is obtained, it returns a rejection with an error message.
// Slice (accessTokenSlice):

// Role: Manages the state related to the access token.
// State:
// token: Stores the access token.
// isLoading: Indicates if the token fetching process is in progress.
// failed: Indicates if the token fetching process failed.
// Reducers: No explicit reducers as we are handling the state changes in extraReducers.
// ExtraReducers:
// pending: Sets isLoading to true when the thunk action is dispatched.
// fulfilled: Updates the token with the new access token, sets isLoading to false, and resets failed to false.
// rejected: Sets isLoading to false and failed to true if the thunk action fails.
// Store Configuration:

// Combines the accessTokenSlice reducer into the store configuration.





// ################################## PREVIOUS CODE ############################
// import { createSlice, configureStore, createAsyncThunk } from '@reduxjs/toolkit';
// import authenticate from './login_api';

// const initialState = {
//     accessToken: {
//         isLoading: false,
//         failed: false,
//         token: undefined
//     },
//     user: {}
// };

// // William: What I am trying to do is to try to get the Access Token asynchronously throught Redux
// const accessTokenThunk = createAsyncThunk('user/getAccessToken',
//     async () => {
//         const access_token = await authenticate();
//         console.log(access_token);
//         return access_token;
//     }
// );

// // Here my extra reducers aren't working atm
// const userSlice = createSlice({
//     name: 'user',
//     initialState: initialState,
//     reducers: {},
//     // extraReducers: {
//     //     [accessTokenThunk.pending]: (state, action) => {
//     //         return {
//     //             ...state,
//     //             accessToken: {
//     //                 isLoading: true,
//     //                 failed: false,
//     //                 token: undefined
//     //             }
//     //         };
//     //     },
//     //     [accessTokenThunk.fulfilled]: (state, action) => {
//     //         return {
//     //             ...state,
//     //             accessToken: {
//     //                 isLoading: false,
//     //                 failed: false,
//     //                 token: action.payload
//     //             }
//     //         };
//     //     },
//     //     [accessTokenThunk.rejected]: (state, action) => {
//     //         return {
//     //             ...state,
//     //             accessToken: {
//     //                 isLoading: false,
//     //                 failed: true,
//     //                 token: undefined
//     //             }
//     //         }
//     //     }
//     // }
// });


// export const store = configureStore({
//     reducer: userSlice.reducer
// });

