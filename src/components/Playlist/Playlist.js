import React from "react";

const Playlist = ({ playlist, removeFromPlaylist }) => {
  return (
    <div className="w-full mt-4 overflow-hidden bg-white rounded-lg shadow-md">
      <h2 className="p-4 text-2xl font-bold text-center text-white bg-green-400">
        Playlist
      </h2>
      <div className="p-4">
        {playlist.length > 0 ? (
          playlist.map((song, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 border-b border-gray-300"
            >
              <div>
                <h2 className="text-lg font-semibold">{song.name}</h2>
                <div>
                <p className="text-gray-700">{song.artists}</p>
                <p className="text-gray-700">{song.album}</p>
                </div>
              </div>
              {/* Remove button */}
              <button
                onClick={() => removeFromPlaylist({ ...song, index })} // Pass song and index
                className="px-2 py-1 ml-4 text-white transition duration-200 bg-red-500 rounded-lg hover:bg-red-600"
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
