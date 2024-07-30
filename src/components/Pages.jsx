import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Importing Pages
import Home from './pages/Home';
import AuthCallback from "./pages/AuthCallback";
import SearchResults from "./pages/SearchResults";
import Musiclibrary from './pages/MusicLibrary';
import Account from './pages/Account';

// Importing Styles
import { primary_container } from '../App.module.css';
import { pages } from './styles/Pages.module.css'

function Pages() {
    const location = useLocation();
    const style = location.pathname === '/search' ? pages : `${primary_container} ${pages}`;

    return (
        <div className={style}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth/callback" element={<AuthCallback />} />{" "}
                {/* Add this route */}
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
            </Routes>
        </div>
    );
}

export default Pages;