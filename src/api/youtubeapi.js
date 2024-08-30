// src/api/youtubeService.js
import axios from "axios";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY; // Correct way to access environment variables in Vite

export const searchMusic = async (query) => {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: query,
          type: "video",
          videoCategoryId: "10", // Music category
          key: API_KEY, // Use the environment variable
        },
      }
    );
    return response.data.items;
  } catch (error) {
    console.error("Error fetching music:", error);
    throw error;
  }
};
