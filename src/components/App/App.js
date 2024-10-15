import React, { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import TrackList from "../Tracklist/Tracklist";
import Playlist from "../Playlist/Playlist";
import Login from "../Login/Login";
import { currentToken } from "../../util/currentToken";
import { getToken } from "../../util/getToken";

// AQAxNFKINLLtFt7y_BUyCbYim1hBPRxdlE1kW4QMgT9IYeVpjSGK7ggKvci8CbnsrtoFaU5zpypu6JE2ymhkeC9MQw-yS9v-azJU3wHXiPB6rNS4FvdgJSmRhAgCKtO2KqHkDM_wfJNKxNd0dIhuk9-F-ulkjpeUQXDxq0Z9aQRvS0vEwR69Ddig9IETqmldZ7bpQTRaFOL1a6oy1VV-wqYUEjnHXPgBFqIS7WgHTZc15ierbRz3SSj0XYuubk7P5vF8tTzIrOhDb9iW4VYIw3M
const App = () => {
  const [hasSearched, setHasSearched] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [playlist, setPlaylist] = useState([]); // New state for Playlist

  useEffect(() => {
    // On page load, try to fetch auth code from current browser search URL
    const args = new URLSearchParams(window.location.search);
    const code = args.get("code");

    // If we find a code, we're in a callback, do a token exchange
    if (code) {
      const token = getToken(code);
      currentToken.save(token);

      // Remove code from URL so we can refresh correctly.
      const url = new URL(window.location.href);
      url.searchParams.delete("code");

      const updatedUrl = url.search ? url.href : url.href.replace("?", "");
      window.history.replaceState({}, document.title, updatedUrl);
    }
  }, []);

  // Function to handle the actual search submission
  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      setHasSearched(true); // Set hasSearched only when search term is not empty
    } else {
      setHasSearched(false); // If the search term is empty, reset the search state
    }
  };

  // Function to add a track to the playlist
  const addToPlaylist = (track) => {
    setPlaylist((prevPlaylist) => [...prevPlaylist, track]);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <h1 className="w-full p-4 text-6xl font-bold text-center text-white bg-green-400 rounded-lg shadow-lg">
        GrooveShare
      </h1>
      <Login />
      <div className="flex flex-col items-center flex-grow p-4">
        {/* SearchBar always visible */}
        <SearchBar
          setHasSearched={setHasSearched}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          handleSearch={handleSearch}
        />
        {/* Flexbox container to render TrackList and Playlist side by side */}
        {hasSearched && searchTerm.trim() !== "" && (
          <div className="flex items-start justify-between flex-grow w-full mt-4">
            {/* TrackList and Playlist will take up more space with adjusted width */}
            <div className="w-3/5 min-h-screen pr-4">
              <TrackList
                searchTerm={searchTerm}
                addToPlaylist={addToPlaylist}
              />
            </div>
            <div className="w-2/5 min-h-screen pl-4">
              <Playlist playlist={playlist} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
