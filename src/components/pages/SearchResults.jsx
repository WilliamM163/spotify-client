// src/components/SearchResults.jsx
import React from "react";
import PropTypes from "prop-types"; // Import PropTypes

const SearchResults = ({ results = [] }) => {
  if (!Array.isArray(results)) {
    return <p>Invalid results</p>;
  }

  if (results.length === 0) {
    return <p>No results found</p>;
  }

  return (
    <div>
      {results.map((item) => {
        const { id, snippet } = item;
        const videoId = id.videoId;
        const title = snippet.title;
        const thumbnail = snippet.thumbnails.default.url;

        return (
          <div key={videoId}>
            <img src={thumbnail} alt={title} />
            <h3>{title}</h3>
            <a
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Listen on YouTube
            </a>
          </div>
        );
      })}
    </div>
  );
};

// Define default props and prop types
SearchResults.propTypes = {
  results: PropTypes.array,
};

SearchResults.defaultProps = {
  results: [],
};

export default SearchResults;

/**
 * SearchResults Component
 *
 * This component displays the search results fetched from the Spotify API.
 * It uses Redux to get the results from the store and display them in a list.
 */
