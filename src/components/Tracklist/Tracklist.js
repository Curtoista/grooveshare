import React from "react";
import SearchBar from "../SearchBar/SearchBar";

// Sample track data
// const tracks = [];

// Track component, receives individual track and addToPlaylist function
const Track = ({ track, addToPlaylist }) => {
    const { name, artists, album, images } = track;

    // Format artists if it's an array
    const artistNames = Array.isArray(artists)
        ? artists.map(artist => artist.name).join(", ")
        : artists;

    return (
      <div className="flex items-center justify-between p-4 transition duration-150 ease-in-out border-b border-gray-300 hover:bg-gray-100">
        {/* Track Information */}
        <div>
          <h2 className="text-xl font-semibold">{name || "Unknown Track"}</h2>
          <div className="text-gray-700">
            <p className="text-lg">Artist: {artistNames || "Unknown Artist"}</p>
            <p className="text-lg text-gray-600">Album: {album || "Unknown Album"}</p>
          </div>
          {/* Add to Playlist button */}
          <button
            onClick={() => addToPlaylist(track)}
            className="px-2 py-1 mt-2 text-white transition duration-200 bg-blue-500 rounded-lg hover:bg-blue-600"
            aria-label={`Add ${name} to playlist`}
          >
            Add to Playlist
          </button>
        </div>

        {/* Album Art Image */}
        {images ? (
          <img
            src={images.url}
            alt={`${album} album cover`}
            className="w-32 h-32 rounded-md"
          />
        ) : (
          <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
      </div>
    );
};

// TrackList component with Track component layout updated
const TrackList = ({ filteredTracks = [], addToPlaylist }) => {

console.log(filteredTracks)

  return (
    <div className="w-full mt-4 overflow-hidden bg-white rounded-lg shadow-md">
      <h2 className="p-4 text-2xl font-bold text-center text-white bg-green-400">
        Track List
      </h2>
      {/* Map through filtered tracks and pass addToPlaylist to each Track component */}
      {filteredTracks.length > 0 ? (
        filteredTracks.map((track) => (
          <Track key={track.id} track={track} addToPlaylist={addToPlaylist} />
        ))
      ) : (
        <p className="p-4 text-center">No tracks found.</p>
      )}
    </div>
  );
};

export default TrackList;
