import React from "react";
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
  const handleTitleChange = (event) => {
    const newTitle = event.target.value;
    setPlaylistTitle(newTitle);
    console.log("Current input value:", newTitle);
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
      <input
        type="text"
        id="playlist"
        name="playlist"
        className="w-full p-4 text-2xl font-bold text-center text-white placeholder-blue-600 bg-green-400"
        placeholder="Name your playlist"
        size="10"
        onChange={handleTitleChange}
        value={playlistTitle}
      />

      {playlist.length > 0 && (
        <div className="flex justify-center items-center mb-0">
          <button
            className="px-10 py-3 mt-3 mb-3 text-base font-medium text-white bg-green-400 rounded-md shadow-sm hover:bg-green-500 focus:outline-none transform transition duration-150 ease-in-out active:scale-95"
            onClick={savePlaylist}
          >
            Save to Spotify
          </button>
        </div>
      )}

      {/* Increased height for the playlist container */}
      <div className="max-h-[40rem] p-4 overflow-y-auto"> {/* Set max height to 40rem */}
        {playlist.length > 0 ? (
          playlist.map((song) => (
            <div
              key={song.id}
              className="relative flex items-center justify-between p-4 transition duration-150 border-b border-gray-300 hover:bg-gray-100"
              style={{
                backgroundImage: song.images && song.images.url
                  ? `url(${song.images.url})`
                  : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              <div className="relative z-10 text-white">
                <h2 className="text-lg font-semibold">
                  {song.name || "Unknown Track"}
                </h2>
                <div>
                  <p className="text-gray-300">
                    {Array.isArray(song.artists) ? song.artists.join(", ") : song.artists || "Unknown Artist"}
                  </p>
                  <p className="text-gray-300">
                    {song.album || "Unknown Album"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFromPlaylist(song)}
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
