import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchThunk } from '../store';
import { Link } from 'react-router-dom';

// Importing styles
import { primary_container } from '../App.module.css';
import { search, space, search_input, search_button } from './styles/Search.module.css';

const Search = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();

    const handleSearch = () => {
        dispatch(searchThunk(query));
    };

    return (
        <div className={`${primary_container} ${search}`}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What song are you looking for?"
                className={search_input}
            />
            <div className={space}></div>
            <Link to='/search'>
                <img
                    src='/icons/search.svg'
                    onClick={handleSearch}
                    className={search_button}
                />
            </Link>
        </div>
    );
};

export default Search;


// * SearchBar Component->
// * This component provides an input field and a button for searching music tracks.
// * It uses Redux to dispatch the search query and display the results.
// 


/*
    I am changing the Search button from an button to an icon
    Old Code:

    function Search() {
    const { results, isLoading, error } = useSelector(state => state.search);
    ...

    return (
        <div className={`${primary_container} ${styles.search}`}>
            ...
            <button
                onClick={handleSearch}
                disabled={isLoading}
                className={styles.search_input}
            >
                {isLoading ? 'Searching...' : '🔍 Search'}
            </button>
        </div>
    );
}
*/

