import React, { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import TrackList from "../Tracklist/Tracklist";
import Playlist from "../Playlist/Playlist";
import Login from "../Login/Login";
import { currentToken } from "../../util/currentToken";
import { getToken } from "../../util/getToken";

const App = () => {
  const [hasSearched, setHasSearched] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [playlist, setPlaylist] = useState([]); // State for Playlist
  const [filteredTracks, setFilteredTracks] = useState([]);
  const [playlistTitle, setPlaylistTitle] = useState("");
  const [playlistUriArray, setPlaylistUriArray] = useState([]);

  useEffect(() => {
    // On page load, try to fetch auth code from current browser search URL
    const args = new URLSearchParams(window.location.search);
    const code = args.get("code");

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
  const handleSearch = (filteredTracks) => {
    setFilteredTracks(filteredTracks);
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

  // Function to remove one instance of a track from the playlist
  const removeFromPlaylist = (trackToRemove) => {
    setPlaylist((prevPlaylist) => {
      const trackIndex = prevPlaylist.findIndex(
        (track) => track.id === trackToRemove.id
      );
      if (trackIndex !== -1) {
        // Create a new array without mutating the original playlist state
        const newPlaylist = [...prevPlaylist];
        newPlaylist.splice(trackIndex, 1); // Remove only the first match
        return newPlaylist;
      }
      return prevPlaylist;
    });
  };

  // Effect to update playlistUriArray whenever playlist changes
  useEffect(() => {
    console.log("Current Playlist:", playlist); // Log the current playlist
    const uris = playlist.map(song => song.uri); // Map the URIs from the playlist
    console.log("Mapped URIs:", uris); // Log the mapped URIs
    setPlaylistUriArray(uris); // Set the playlist URI array
  }, [playlist]);

  return (
    <div className="flex flex-col min-h-screen bg-blue-200">
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
          filteredTracks={filteredTracks}
        />

        {/* Flexbox container to render TrackList and Playlist side by side */}
        {hasSearched && searchTerm.trim() !== "" && (
          <div className="flex items-start justify-between flex-grow w-full mt-4">
            {/* TrackList and Playlist will take up more space with adjusted width */}
            <div className="w-3/5 min-h-screen pr-4">
              <TrackList
                searchTerm={searchTerm}
                addToPlaylist={addToPlaylist}
                filteredTracks={filteredTracks}
              />
            </div>
            <div className="w-2/5 min-h-screen pl-4">
              <Playlist
                playlist={playlist}
                removeFromPlaylist={removeFromPlaylist} // Pass remove function to Playlist
                playlistTitle={playlistTitle}
                setPlaylistTitle={setPlaylistTitle}
                playlistUriArray={playlistUriArray}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
