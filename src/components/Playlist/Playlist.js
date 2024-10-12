import React from "react";

const Playlist = ({ playlist }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mt-4 w-1/2">
      <h2 className="text-2xl font-bold text-center p-4 bg-green-400 text-white">Playlist</h2>
      <div className="p-4">
        {playlist.length > 0 ? (
          playlist.map((song, index) => (
            <div key={index} className="p-2 border-b border-gray-300">
              <h3 className="text-lg font-semibold">{song.name}</h3>
              <p className="text-gray-700">{song.artist}</p>
            </div>
          ))
        ) : (
          <p>Your playlist is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Playlist;
