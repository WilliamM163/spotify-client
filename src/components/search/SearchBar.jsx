import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchThunk } from '../../store';

// Importing styles
import { primary_container } from '../../App.module.css';
import styles from './SearchBar.module.css';

const Search = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const { results, isLoading, error } = useSelector(state => state.search);

    const handleSearch = () => {
        dispatch(searchThunk(query));
    };

    return (
        <div className={`${primary_container} ${styles.search}`}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What song are you looking for?"
                className={styles.search_input}
            />
            <button
                onClick={handleSearch}
                disabled={isLoading}
                className={styles.search_button}
            >
                {isLoading ? 'Searching...' : '🔍 Search'}
            </button>
        </div>
    );
};

export default Search;


// * SearchBar Component->
// * This component provides an input field and a button for searching music tracks.
// * It uses Redux to dispatch the search query and display the results.
// 

