export async function searchSpotify(query, token) {
  const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
      throw new Error('Failed to fetch search results');
  }

  const data = await response.json();
  console.log('Fetched Data:', data); // Log data for debugging
  return data; // Ensure data is in the correct format
}
/**
 * Spotify API Helper Functions
 * 
 * This file contains helper functions to interact with the Spotify API.
 * It includes functions to fetch search results and handle authorization headers.
 */