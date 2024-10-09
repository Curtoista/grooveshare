import React, { useState } from "react";

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

const Track = ({ track }) => {
  const { name, artist, album } = track;

  return (
    <div className="p-4 border-b border-gray-300 hover:bg-gray-100 transition duration-150 ease-in-out">
      <h2 className="text-xl font-semibold">{name}</h2>
      <div className="text-gray-700">
        <p>{artist}</p>
        <p className="text-sm">{album}</p>
      </div>
    </div>
  );
};

const TrackList = (hasSearched) => {
    return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mt-4 w-1/2">
      <h2 className="text-2xl font-bold text-center p-4 bg-green-400 text-white">Track List</h2>
      {tracks.map((track) => (
        <Track key={track.id} track={track} />
      ))}
    </div>
  );
}

export default TrackList;
