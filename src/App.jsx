import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, useLocation } from "react-router-dom";

// Importing Components
import SearchBar from './components/SearchBar';
import Tabs from './components/Tabs';
import AccountTab from './components/AccountTab';
import Credits from './components/Credits';
import Player from './components/Player';
import Sidebar from './components/Sidebar';

import Pages from './components/Pages';

// Importing Pages
import Home from './components/pages/Home';
import Musiclibrary from "./components/pages/Musiclibrary";
import Account from "./components/pages/Account";
import SearchResults from './components/pages/SearchResults';

import AuthCallback from "./components/pages/AuthCallback"; // Import AuthCallback

// Importing styles
import styles from './App.module.css';


function App() {
  const isLoading = useSelector((state) => state.accessToken.isLoading);
  const failed = useSelector((state) => state.accessToken.failed);
  const location = useLocation();

  if (isLoading) return <div>Loading...</div>;
  if (failed) return <div>Failed to fetch access token.</div>;

  return (
    <div className={styles.grid}>
      <Tabs />
      <SearchBar />
      <AccountTab />
      <Pages />

      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/callback" element={<AuthCallback />} />{" "}
        <Route
          path="/search"
          element={
            <>
              <SearchResults />
            </>
          }
        />
        <Route path="/music-library" element={<Musiclibrary />} />
        <Route path="/account" element={<Account />} />
      </Routes> */}

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
