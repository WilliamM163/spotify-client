import React from 'react';
import { useSelector } from 'react-redux';
import SearchBar from './components/search/SearchBar';
import SearchResults from './components/search/SearchResults';

function App() {
    const accessToken = useSelector((state) => state.accessToken.token);
    const isLoading = useSelector((state) => state.accessToken.isLoading);
    const failed = useSelector((state) => state.accessToken.failed);

    if (isLoading) return <div>Loading...</div>;
    if (failed) return <div>Failed to fetch access token.</div>;

    return (
        <div>
            <h1>Spotify App</h1>
            <p>Access Token: {accessToken}</p>
            <SearchBar />
            <SearchResults />
        </div>
    );
}

export default App;

// * This is the main entry point of the Spotify App. It manages the authentication state using Redux.
// * The access token is fetched and displayed on the UI.
// * The component also includes the SearchBar and SearchResults components for searching and displaying music tracks.

