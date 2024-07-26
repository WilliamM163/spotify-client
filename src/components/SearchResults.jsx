import React from 'react';
import { useSelector } from 'react-redux';
import { Track } from './Track';

// Importing Styles
import { search_results } from './styles/Search.module.css';

function SearchResults() {
  const { results, isLoading, error } = useSelector((state) => state.search);

  if (isLoading) return <div className={search_results}>Loading...</div>;
  if (error) return <div className={search_results}>Error: {error}</div>;
  if (results.length === 0) return <div className={search_results}>No Results</div>

  return (
    <div className={search_results}>
      {results.map(result => <Track track={result} />)}
    </div>
  );

}

export default SearchResults;

/**
 * SearchResults Component
 * 
 * This component displays the search results fetched from the Spotify API.
 * It uses Redux to get the results from the store and display them in a list.
 */