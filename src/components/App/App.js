import React, { useState, useEffect } from 'react';
import SearchBar from "../SearchBar/SearchBar";
import TrackList from "../Tracklist/Tracklist";
import Playlist from "../Playlist/Playlist";
import Login from "../Login/Login";
import Logout from "../Login/Logout";
import WebPlayer from "../WebPlayer/WebPlayer";
import { currentToken } from "../../util/currentToken";
import { getToken } from "../../util/getToken";

const App = () => {
  const [hasSearched, setHasSearched] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const [filteredTracks, setFilteredTracks] = useState([]);
  const [playlistTitle, setPlaylistTitle] = useState("");
  const [playlistUriArray, setPlaylistUriArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedTrackUri, setSelectedTrackUri] = useState(null);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const args = new URLSearchParams(window.location.search);
    const code = args.get("code");

    const handleAuth = async () => {
      try {
        if (code) {
          const token = await getToken(code);
          currentToken.save(token);
          setAccessToken(token.access_token);

          const url = new URL(window.location.href);
          url.searchParams.delete("code");
          const updatedUrl = url.search ? url.href : url.href.replace("?", "");
          window.history.replaceState({}, document.title, updatedUrl);
        } else {
          if (currentToken.isExpired()) {
            await currentToken.refresh();
          }
          const saved = currentToken.access_token;
          if (saved) {
            setAccessToken(saved);
          }
        }

        console.log("Initial access token:", currentToken.access_token);
      } catch (err) {
        console.error("Authentication error:", err);
        setError("Failed to retrieve or refresh authentication token.");
      }
    };

    handleAuth();

    const refreshInterval = setInterval(async () => {
      try {
        await currentToken.refresh();
        const newToken = currentToken.access_token;
        setAccessToken(newToken);
        console.log("Token auto-refreshed:", newToken);
      } catch (err) {
        console.error("Auto-refresh failed:", err);
      }
    }, 55 * 60 * 1000); // 55 minutes

    return () => clearInterval(refreshInterval);
  }, []);

  const handleSearch = async (tracks) => {
    setLoading(true);
    setError("");

    try {
      setFilteredTracks(tracks);
      setHasSearched(searchTerm.trim() !== "");
    } catch (err) {
      console.error("Error during search:", err);
      setError("An error occurred while searching.");
    } finally {
      setLoading(false);
    }
  };

  const addToPlaylist = (track) => {
    setPlaylist((prev) => [...prev, track]);
  };

  const removeFromPlaylist = (trackToRemove) => {
    setPlaylist((prev) => {
      const index = prev.findIndex((t) => t.id === trackToRemove.id);
      if (index !== -1) {
        const copy = [...prev];
        copy.splice(index, 1);
        return copy;
      }
      return prev;
    });
  };

  useEffect(() => {
    const uris = playlist.map((song) => song.uri);
    setPlaylistUriArray(uris);
  }, [playlist]);

  return (
    <div className="flex flex-col min-h-screen bg-blue-200">
      <h1 className="w-full p-4 text-6xl font-bold text-center text-white bg-green-400 rounded-lg shadow-lg">
        GrooveShare
      </h1>

      <Login />
      <Logout />

      <div className="flex flex-col items-center flex-grow p-4">
        <SearchBar
          setHasSearched={setHasSearched}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          filteredTracks={filteredTracks}
        />

        {loading && <p className="text-lg text-white">Loading...</p>}
        {error && <p className="text-lg text-red-500">{error}</p>}

        {hasSearched && searchTerm.trim() !== "" && (
          <div className="flex items-start justify-between flex-grow w-full mt-4">
            <div className="w-3/5 min-h-screen pr-4">
              <TrackList
                searchTerm={searchTerm}
                addToPlaylist={addToPlaylist}
                filteredTracks={filteredTracks}
                onTrackPlay={(track) => setSelectedTrackUri(track.uri)}
              />
              {filteredTracks.length === 0 && !loading && (
                <p className="text-lg text-gray-500">
                  No tracks found for "{searchTerm}".
                </p>
              )}
            </div>
            <div className="sticky top-0 w-2/5 min-h-screen pl-4">
              <Playlist
                playlist={playlist}
                setPlaylist={setPlaylist}
                removeFromPlaylist={removeFromPlaylist}
                playlistTitle={playlistTitle}
                setPlaylistTitle={setPlaylistTitle}
                playlistUriArray={playlistUriArray}
              />
            </div>
          </div>
        )}

        <div className="w-full mt-8">
          <WebPlayer token={accessToken} track={selectedTrackUri} />
        </div>
      </div>
    </div>
  );
};

export default App;
