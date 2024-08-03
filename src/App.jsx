import React from 'react';
import { useSelector } from 'react-redux';

// Importing Components
import SearchBar from './components/SearchBar';
import Tabs from './components/Tabs';
import AccountTab from './components/AccountTab';
import Credits from './components/Credits';
import Player from './components/Player';
import Sidebar from './components/Sidebar';

import Pages from './components/Pages';

// Importing styles
import styles from './App.module.css';


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
      <Pages />
      <Player />
      <Sidebar />
      <Credits />
    </div>
  );
}

export default App;

// * This is the main entry point of the Spotify App. It manages the authentication state using Redux.
// * The access token is fetched and displayed on the UI.
// * The component also includes the SearchBar and SearchResults components for searching and displaying music tracks.
