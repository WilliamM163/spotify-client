// src/components/SearchBar.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchMusic } from "../api/youtubeapi";
import SearchResults from "./pages/SearchResults"; // Import the updated SearchResults component

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const musicResults = await searchMusic(query);
      setResults(musicResults || []); // Ensure results is always an array
    } catch (err) {
      setError("Failed to fetch results.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for music..."
      />
      <button onClick={handleSearch}>Search</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <SearchResults results={results} /> {/* Pass results to SearchResults */}
    </div>
  );
};

export default SearchBar;

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
