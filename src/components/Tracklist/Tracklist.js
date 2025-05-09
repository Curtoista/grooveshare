import React from "react";

// Track component, receives individual track and addToPlaylist + onTrackPlay
const Track = ({ track, addToPlaylist, onTrackPlay }) => {
  const { name, artists, album, images, uri } = track;

  const artistNames = Array.isArray(artists)
    ? artists.map((artist) => artist.name).join(", ")
    : artists || "Unknown Artist";

  return (
    <div className="flex items-center justify-between p-4 transition duration-150 ease-in-out border-b border-gray-300 hover:bg-gray-100">
      {/* Track Information */}
      <div>
        <h2 className="text-xl font-semibold">{name || "Unknown Track"}</h2>
        <div className="text-gray-700">
          <p className="text-lg">Artist: {artistNames}</p>
          <p className="text-lg text-gray-600">Album: {album || "Unknown Album"}</p>
        </div>
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => addToPlaylist(track)}
            className="px-2 py-1 text-white transition duration-200 bg-blue-500 rounded-lg hover:bg-blue-600"
            aria-label={`Add ${name || "this track"} to playlist`}
          >
            Add to Playlist
          </button>
          <button
            onClick={() => onTrackPlay(track)}
            className="px-2 py-1 text-white transition duration-200 bg-green-500 rounded-lg hover:bg-green-600"
            aria-label={`Play ${name || "this track"}`}
          >
            Play
          </button>
        </div>
      </div>

      {/* Album Art Image */}
      {images && images.url ? (
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

// TrackList with onTrackPlay passed down
const TrackList = ({ filteredTracks = [], addToPlaylist, onTrackPlay }) => {
  return (
    <div className="w-full mt-4 overflow-hidden bg-white rounded-lg shadow-md">
      <h2 className="p-4 text-2xl font-bold text-center text-white bg-green-400">
        Track List
      </h2>
      {filteredTracks.length > 0 ? (
        filteredTracks.map((track) => (
          <Track
            key={track.id}
            track={track}
            addToPlaylist={addToPlaylist}
            onTrackPlay={onTrackPlay} // 👈 Pass it down here
          />
        ))
      ) : (
        <p className="p-4 text-center">No tracks found.</p>
      )}
    </div>
  );
};

export default TrackList;
