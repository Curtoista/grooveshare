import React from "react";
import SearchBar from "../SearchBar/SearchBar";

// Sample track data
const tracks = [];

// Track component, receives individual track and addToPlaylist function
const Track = ({ track, addToPlaylist }) => {
    // console.log(track);
    const { name, artists, album } = track; // Assuming the track object has these fields
  
    return (
      <div className="p-4 transition duration-150 ease-in-out border-b border-gray-300 hover:bg-gray-100">
        <h2 className="text-xl font-semibold">{name}</h2>
        <div className="text-gray-700">
          <p className="text-lg">Artist: {artists}</p> {/* Display artist */}
          <p className="text-lg text-gray-600">Album: {album}</p> {/* Display album */}
        </div>
        {/* Add to Playlist button */}
        <button
          onClick={() => addToPlaylist(track)} // Call addToPlaylist when clicked
          className="px-2 py-1 mt-2 text-white transition duration-200 bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Add to Playlist
        </button>
      </div>
    );
  };

// TrackList component now properly receives addToPlaylist from App.js
const TrackList = ({ filteredTracks = [], addToPlaylist }) => {
  console.log(filteredTracks);

  return (
    <div className="w-full mt-4 overflow-hidden bg-white rounded-lg shadow-md">
      <h2 className="p-4 text-2xl font-bold text-center text-white bg-green-400">
        Track List
      </h2>
      {/* Map through filtered tracks and pass addToPlaylist to each Track component */}
      {filteredTracks.length > 0 ? (
        filteredTracks.map((track) => (
          <Track key={track.id} track={track} addToPlaylist={addToPlaylist} />
        ))
      ) : (
        <p className="p-4 text-center">No tracks found.</p>
      )}
    </div>
  );
};

export default TrackList;
