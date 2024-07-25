import React from 'react';
import { useSelector } from 'react-redux';

import { Track } from './Track';

import styles from './styles/SearchResults.module.css';

function SearchResults() {
  const { results, isLoading, error } = useSelector((state) => state.search);

  if (isLoading) return <div className={styles.search_results}>Loading...</div>;
  if (error) return <div className={styles.search_results}>Error: {error}</div>;
  if (results.length === 0) return <div className={styles.search_results}>No Results</div>

  return (
    <div className={styles.search_results}>
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