import React, { useState } from "react";
import Playlist from "../Playlist/Playlist";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";




const App = () => {

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <h1 className="bg-green-400 flex items-center justify-center bg- text-6xl font-bold text-white gradient-text shadow-lg p-4 rounded-lg">GrooveShare</h1>
    <SearchBar></SearchBar>
    </div>
  );
};

export default App;