import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import TrackList from "../Tracklist/Tracklist";
import Playlist from "../Playlist/Playlist";

const App = () => {
  const [hasSearched, setHasSearched] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [playlist, setPlaylist] = useState([]); // New state for Playlist

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
    <div className="h-screen flex flex-col bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <h1 className="bg-green-400 text-6xl font-bold text-white shadow-lg p-4 rounded-lg w-full text-center">
        GrooveShare
      </h1>
      <div className="flex flex-col items-center p-4 flex-grow">
        {/* SearchBar always visible */}
        <SearchBar
          setHasSearched={setHasSearched}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          handleSearch={handleSearch}
        />
        {/* Flexbox container to render TrackList and Playlist side by side */}
        {hasSearched && searchTerm.trim() !== "" && (
          <div className="flex justify-between items-start w-full mt-4 flex-grow">
            {/* TrackList and Playlist will take up more space with adjusted width */}
            <div className="w-3/5 pr-4 min-h-screen">
              <TrackList searchTerm={searchTerm} addToPlaylist={addToPlaylist} />
            </div>
            <div className="w-2/5 pl-4 min-h-screen">
              <Playlist playlist={playlist} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
