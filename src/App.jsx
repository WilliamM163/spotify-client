import React from 'react';
import { useSelector } from 'react-redux';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Tabs from './components/Tabs';
import AccountTab from './components/AccountTab';

import styles from './App.module.css';

import { Sidebar } from './components/Sidebar';

function App() {
    const isLoading = useSelector((state) => state.accessToken.isLoading);
    const failed = useSelector((state) => state.accessToken.failed);

    if (isLoading) return <div>Loading...</div>;
    if (failed) return <div>Failed to fetch access token.</div>;

    return (
        <div className={styles.grid}>
            <Tabs />
            <SearchBar />
            <AccountTab />
            <SearchResults />
            <Sidebar />
        </div>
    );
}

export default App;

// * This is the main entry point of the Spotify App. It manages the authentication state using Redux.
// * The access token is fetched and displayed on the UI.
// * The component also includes the SearchBar and SearchResults components for searching and displaying music tracks.


// OLD CODE:  - I removed the text Spotify App header, and the access_token from the view
// function App() {
//     ...code

//     return (
//         <div>
//             <h1>Spotify App</h1>
//             <p>Access Token: {accessToken}</p>
//             <SearchBar />
//             <SearchResults />
//         </div>
//     );
// }