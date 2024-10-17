import React from "react";

const Playlist = ({ playlist, removeFromPlaylist }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mt-4 w-1/2">
      <h2 className="text-2xl font-bold text-center p-4 bg-green-400 text-white">Playlist</h2>
      <div className="p-4">
        {playlist.length > 0 ? (
          playlist.map((song, index) => (
            <div key={index} className="p-2 border-b border-gray-300 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{song.name}</h3>
                <p className="text-gray-700">{song.artist}</p>
              </div>
              {/* Remove button */}
              <button
                onClick={() => removeFromPlaylist({ ...song, index })} // Pass song and index
                className="ml-4 px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
              >
                Remove
              </button>
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
