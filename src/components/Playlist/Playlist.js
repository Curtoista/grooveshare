import React, { useEffect } from "react";

const Playlist = ({ playlist, removeFromPlaylist, playlistTitle, setPlaylistTitle }) => {
  
  // Handle input change
  const handleTitleChange = (event) => {
    const newTitle = event.target.value; // Get the current input value
    setPlaylistTitle(newTitle); // Update state
    console.log("Current input value:", newTitle); // Log the input value directly
  };

  // // Update playlistUriArray whenever playlist chang

  // console.log("Current Playlist:", playlist);
  // console.log(playListUriArray); // Log the current playlist for debugging

  return (
    <div className="w-full mt-4 overflow-hidden bg-white rounded-lg shadow-md">
      {/* Playlist Input */}
      <input
        type="text"
        id="playlist"
        name="playlist"
        className="p-4 text-2xl font-bold text-center text-white bg-green-400 w-full placeholder-blue-600"
        placeholder="New Playlist"
        size="10"
        onChange={handleTitleChange} // Update state on change
        value={playlistTitle} // Set input value to state
      />
      
      <div className="p-4">
        {playlist.length > 0 ? (
          playlist.map((song, index) => (
            <div
              key={index}
              className="relative flex items-center justify-between p-4 border-b border-gray-300 hover:bg-gray-100 transition duration-150"
              style={{
                backgroundImage: song.images ? `url(${song.images.url})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Overlay for readability */}
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>

              {/* Song Details */}
              <div className="relative z-10 text-white">
                <h2 className="text-lg font-semibold">{song.name || "Unknown Track"}</h2>
                <div>
                  <p className="text-gray-300">{song.artists || "Unknown Artist"}</p>
                  <p className="text-gray-300">{song.album || "Unknown Album"}</p>
                </div>
              </div>

              {/* Remove button */}
              <button
                onClick={() => removeFromPlaylist({ ...song, index })} // Pass song and index
                className="relative z-10 px-2 py-1 ml-4 text-white transition duration-200 bg-red-500 rounded-lg hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Your playlist is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Playlist;
