import React, { useEffect } from "react";
import { getUserProfile } from "../../util/getUserProfile";
import { createPlaylist } from "../../util/createPlaylist";
import { addToPlaylist } from "../../util/addToPlaylist";

const Playlist = ({
  playlist,
  removeFromPlaylist,
  playlistTitle,
  setPlaylistTitle,
  playlistUriArray,
}) => {
  // Handle input change
  const handleTitleChange = (event) => {
    const newTitle = event.target.value; // Get the current input value
    setPlaylistTitle(newTitle); // Update state
    console.log("Current input value:", newTitle); // Log the input value directly
  };

  const savePlaylist = () => {
    getUserProfile().then((user) => {
      console.log(user);
      const userId = user.id;
      createPlaylist(userId, playlistTitle).then((playlist) => {
        console.log(playlist);
        addToPlaylist(playlist.id, playlistUriArray);
      });
    });
  };

  return (
    <div className="w-full mt-4 overflow-hidden bg-white rounded-lg shadow-md">
      {/* Playlist Input */}
      <input
        type="text"
        id="playlist"
        name="playlist"
        className="w-full p-4 text-2xl font-bold text-center text-white placeholder-blue-600 bg-green-400"
        placeholder="New Playlist"
        size="10"
        onChange={handleTitleChange} // Update state on change
        value={playlistTitle} // Set input value to state
      />
      <div className="flex justify-center items-center my-6">
        <button
          className="px-20 mb-0 py-6 text-xl font-semibold text-white bg-green-400 rounded-lg shadow-md hover:bg-green-500 focus:outline-none transform transition duration-150 ease-in-out active:scale-95"
          onClick={savePlaylist}
        >
          Save to Spotify
        </button>
      </div>


      <div className="p-4">
        {playlist.length > 0 ? (
          playlist.map((song, index) => (
            <div
              key={index}
              className="relative flex items-center justify-between p-4 transition duration-150 border-b border-gray-300 hover:bg-gray-100"
              style={{
                backgroundImage: song.images
                  ? `url(${song.images.url})`
                  : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Overlay for readability */}
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>

              {/* Song Details */}
              <div className="relative z-10 text-white">
                <h2 className="text-lg font-semibold">
                  {song.name || "Unknown Track"}
                </h2>
                <div>
                  <p className="text-gray-300">
                    {song.artists || "Unknown Artist"}
                  </p>
                  <p className="text-gray-300">
                    {song.album || "Unknown Album"}
                  </p>
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
