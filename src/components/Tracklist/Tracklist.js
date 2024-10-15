import React from "react";

// Sample track data
const tracks = [
  {
    name: "Llama",
    artist: "Phish",
    album: "A Picture of Nectar",
    id: 1,
  },
  {
    name: "Eliza",
    artist: "Phish",
    album: "A Picture of Nectar",
    id: 2,
  },
  {
    name: "Cavern",
    artist: "Phish",
    album: "A Picture of Nectar",
    id: 3,
  },
  {
    name: "Poor Heart",
    artist: "Phish",
    album: "A Picture of Nectar",
    id: 5,
  },
  {
    name: "Stash",
    artist: "Phish",
    album: "A Picture of Nectar",
    id: 6,
  },
];

// Track component, receives individual track and addToPlaylist function
const Track = ({ track, addToPlaylist }) => {
  const { name, artist, album } = track;

  return (
    <div className="p-4 transition duration-150 ease-in-out border-b border-gray-300 hover:bg-gray-100">
      <h2 className="text-xl font-semibold">{name}</h2>
      <div className="text-gray-700">
        <p>{artist}</p>
        <p className="text-sm">{album}</p>
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
const TrackList = ({ searchTerm, addToPlaylist }) => {
  const filteredTracks = tracks.filter((track) =>
    track.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-1/2 mt-4 overflow-hidden bg-white rounded-lg shadow-md">
      <h2 className="p-4 text-2xl font-bold text-center text-white bg-green-400">
        Track List
      </h2>
      {/* Map through filtered tracks and pass addToPlaylist to each Track component */}
      {filteredTracks.map((track) => (
        <Track key={track.id} track={track} addToPlaylist={addToPlaylist} />
      ))}
    </div>
  );
};

export default TrackList;
