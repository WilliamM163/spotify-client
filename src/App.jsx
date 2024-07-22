import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { accessTokenThunk } from './store';

function App() {
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.accessToken.token);
    const isLoading = useSelector((state) => state.accessToken.isLoading);
    const failed = useSelector((state) => state.accessToken.failed);

    console.log(useSelector((state) => state));

    useEffect(() => {
        // Log the access token and other state
        console.log('Access Token:', accessToken);
        console.log('Loading:', isLoading);
        console.log('Failed:', failed);
    }, [accessToken, isLoading, failed]);

    if (isLoading) return <div>Loading...</div>;
    if (failed) return <div>Failed to fetch access token.</div>;

    return (
        <div>
            <h1>Spotify App</h1>
            <p>Access Token: {accessToken}</p>
        </div>
    );
}

export default App;
