import { createSlice, configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import authenticate from './login_api';

const initialState = {
    accessToken: {
        isLoading: false,
        failed: false,
        token: undefined
    },
    user: {}
};

// William: What I am trying to do is to try to get the Access Token asynchronously throught Redux
const accessTokenThunk = createAsyncThunk('user/getAccessToken',
    async () => {
        const access_token = await authenticate();
        console.log(access_token);
        return access_token;
    }
);

// Here my extra reducers aren't working atm
const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {},
    // extraReducers: {
    //     [accessTokenThunk.pending]: (state, action) => {
    //         return {
    //             ...state,
    //             accessToken: {
    //                 isLoading: true,
    //                 failed: false,
    //                 token: undefined
    //             }
    //         };
    //     },
    //     [accessTokenThunk.fulfilled]: (state, action) => {
    //         return {
    //             ...state,
    //             accessToken: {
    //                 isLoading: false,
    //                 failed: false,
    //                 token: action.payload
    //             }
    //         };
    //     },
    //     [accessTokenThunk.rejected]: (state, action) => {
    //         return {
    //             ...state,
    //             accessToken: {
    //                 isLoading: false,
    //                 failed: true,
    //                 token: undefined
    //             }
    //         }
    //     }
    // }
});


export const store = configureStore({
    reducer: userSlice.reducer
});

