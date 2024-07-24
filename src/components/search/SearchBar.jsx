// src/components/Search.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {searchThunk}from '../../store';

const Search = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const { results, isLoading, error } = useSelector(state => state.search);

    const handleSearch = () => {
        dispatch(searchThunk(query));
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for music..."
            />
            <button onClick={handleSearch} disabled={isLoading}>
                {isLoading ? 'Searching...' : 'Search'}
            </button>
            {error && <p>Error: {error}</p>}
            <ul>
                {results.map((item) => (
                    <li key={item.id}>{item.name} by {item.artists[0].name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Search;

// * SearchBar Component->
// * This component provides an input field and a button for searching music tracks.
// * It uses Redux to dispatch the search query and display the results.
// 

