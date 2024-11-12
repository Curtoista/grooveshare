import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserProfile } from "../../util/getUserProfile";
import { createPlaylist } from "../../util/createPlaylist";
import { addToPlaylist } from "../../util/addToPlaylist";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Playlist = ({
  playlist,
  setPlaylist,
  removeFromPlaylist,
  playlistTitle,
  setPlaylistTitle,
  playlistUriArray,
}) => {
  const handleTitleChange = (event) => {
    const newTitle = event.target.value;
    setPlaylistTitle(newTitle);
  };

  const savePlaylist = () => {
    getUserProfile().then((user) => {
      const userId = user.id;
      createPlaylist(userId, playlistTitle).then((playlist) => {
        addToPlaylist(playlist.id, playlistUriArray);
        toast.success("Playlist saved to Spotify successfully!", {
          position: "bottom-center",
          autoClose: 3000,
          style: {
            backgroundColor: "white",
            color: "black",
            fontSize: "16px",
            borderRadius: "8px",
            padding: "10px",
          },
        });
      });
    });
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const updatedPlaylist = Array.from(playlist);
    const [movedSong] = updatedPlaylist.splice(result.source.index, 1);
    updatedPlaylist.splice(result.destination.index, 0, movedSong);
    setPlaylist(updatedPlaylist);
  };

  return (
    <div className="w-full mt-4 overflow-hidden bg-white rounded-lg shadow-md">
      <input
        type="text"
        id="playlist"
        name="playlist"
        className="w-full p-4 text-2xl font-bold text-center text-white placeholder-blue-600 bg-green-400 focus:bg-green-400"
        placeholder="Name your playlist"
        size="10"
        onChange={handleTitleChange}
        value={playlistTitle}
      />

      {playlist.length > 0 && (
        <div className="flex items-center justify-center mb-0">
          <button
            className="px-10 py-3 mt-3 mb-3 text-base font-medium text-white transition duration-150 ease-in-out transform bg-green-400 rounded-md shadow-sm hover:bg-green-500 focus:outline-none active:scale-95"
            onClick={savePlaylist}
          >
            Save to Spotify
          </button>
        </div>
      )}

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="playlist-tracks">
          {(provided) => (
            <ul
              className="max-h-[40rem] p-4 overflow-y-auto"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {playlist.length > 0 ? (
                playlist.map((song, index) => (
                  <Draggable key={song.id} draggableId={song.id} index={index}>
                    {(provided) => (
                      <div
                        key={song.id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="relative flex items-center justify-between p-4 transition duration-150 border-b border-gray-300 hover:bg-gray-100"
                        style={{
                          backgroundImage:
                            song.images && song.images.url
                              ? `url(${song.images.url})`
                              : "none",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          ...provided.draggableProps.style,
                        }}
                      >
                        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                        <div className="relative z-10 text-white">
                          <h2 className="text-lg font-semibold">
                            {song.name || "Unknown Track"}
                          </h2>
                          <div>
                            <p className="text-gray-300">
                              {Array.isArray(song.artists)
                                ? song.artists.join(", ")
                                : song.artists || "Unknown Artist"}
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
                    )}
                  </Draggable>
                ))
              ) : (
                <p className="text-center text-gray-500">
                  Your playlist is empty. Add some songs!
                </p>
              )}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      <ToastContainer />
    </div>
  );
};

export default Playlist;
