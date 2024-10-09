import React, { useState } from "react";
import Playlist from "../Playlist/Playlist";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import TrackList from "../Tracklist/Tracklist";

const App = () => {

  const [hasSearched, setHasSearched] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <h1 className="bg-green-400 text-6xl font-bold text-white shadow-lg p-4 rounded-lg w-full">
        GrooveShare
      </h1>
      <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center p-4">
        <SearchBar setHasSearched={setHasSearched} setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
        {hasSearched && <TrackList />}
      </div>
    </div>
  );
};

export default App;
