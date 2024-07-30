import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Importing Pages
import Home from './pages/Home';
import AuthCallback from "./pages/AuthCallback";
import SearchResults from "./pages/SearchResults";
import Musiclibrary from './pages/Musiclibrary';
import Account from './pages/Account';

import AuthCallback from "./pages/AuthCallback";

function Pages() {
    return (
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
    );
}

export default Pages;