import React from 'react';
import { useSelector } from 'react-redux';

function SearchResults() {
  const { results, isLoading, error } = useSelector((state) => state.search);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {results.length === 0 ? (
        <div>No results found</div>
      ) : (
        <ul>
          {results.map((track) => (
            <li key={track.id}>
              <div>
                <strong>{track.name}</strong> by {track.artists[0].name}
              </div>
            </li>
          ))}
        </ul>
      )}
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