import React from "react";

// Sample track data
const tracks = [
  {
    name: 'Llama',
    artist: 'Phish',
    album: 'A Picture of Nectar',
    id: 1,
  },
  {
    name: 'Eliza',
    artist: 'Phish',
    album: 'A Picture of Nectar',
    id: 2,
  },
  {
    name: 'Cavern',
    artist: 'Phish',
    album: 'A Picture of Nectar',
    id: 3,
  },
  {
    name: 'Poor Heart',
    artist: 'Phish',
    album: 'A Picture of Nectar',
    id: 5,
  },
  {
    name: 'Stash',
    artist: 'Phish',
    album: 'A Picture of Nectar',
    id: 6,
  },
];

// Track component, receives individual track and addToPlaylist function
const Track = ({ track, addToPlaylist }) => {
  const { name, artist, album } = track;

  return (
    <div className="p-4 border-b border-gray-300 hover:bg-gray-100 transition duration-150 ease-in-out">
      <h2 className="text-xl font-semibold">{name}</h2>
      <div className="text-gray-700">
        <p>{artist}</p>
        <p className="text-sm">{album}</p>
      </div>
      {/* Add to Playlist button */}
      <button
        onClick={() => addToPlaylist(track)} // Call addToPlaylist when clicked
        className="mt-2 bg-blue-500 text-white rounded-lg py-1 px-2 hover:bg-blue-600 transition duration-200"
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
    <div className="bg-white shadow-md rounded-lg overflow-hidden mt-4 w-1/2">
      <h2 className="text-2xl font-bold text-center p-4 bg-green-400 text-white">Track List</h2>
      {/* Map through filtered tracks and pass addToPlaylist to each Track component */}
      {filteredTracks.map((track) => (
        <Track key={track.id} track={track} addToPlaylist={addToPlaylist} />
      ))}
    </div>
  );
};

export default TrackList;
