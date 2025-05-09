import { useEffect, useState, useRef } from 'react';

export default function WebPlayer({ token, track }) {
  const [player, setPlayer] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const loadSpotifySDK = () => {
      const script = document.createElement('script');
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.async = true;
      document.body.appendChild(script);
    };

    if (!window.Spotify) {
      loadSpotifySDK();
    }

    window.onSpotifyWebPlaybackSDKReady = () => {
      const newPlayer = new window.Spotify.Player({
        name: 'Grooveshare Web Player',
        getOAuthToken: cb => cb(token),
        volume: 0.5,
      });

      setPlayer(newPlayer);
      playerRef.current = newPlayer;

      newPlayer.addListener('ready', ({ device_id }) => {
        console.log('Player is ready with device ID:', device_id);
        setDeviceId(device_id);
      });

      newPlayer.addListener('not_ready', ({ device_id }) => {
        console.log('Player went offline:', device_id);
      });

      newPlayer.addListener('player_state_changed', (state) => {
        if (!state) return;
        setIsPaused(state.paused);
        setCurrentTrack(state.track_window.current_track);
      });

      newPlayer.connect();
    };
  }, [token]);

  useEffect(() => {
    if (track && deviceId) {
      playTrack(track);
    }
  }, [track, deviceId]);

  const togglePlay = async () => {
    if (playerRef.current) {
      await playerRef.current.togglePlay();
    }
  };

  const skipNext = async () => {
    if (playerRef.current) {
      await playerRef.current.nextTrack();
    }
  };

  const skipPrevious = async () => {
    if (playerRef.current) {
      await playerRef.current.previousTrack();
    }
  };

  const playTrack = async (uri) => {
    if (!deviceId) {
      console.error("Device ID not set yet.");
      return;
    }

    try {
      await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: 'PUT',
        body: JSON.stringify({ uris: [uri] }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Failed to play track:", error);
    }
  };

  return (
    <div className="p-4 rounded-lg shadow-md bg-black text-white max-w-sm">
      <h2 className="text-lg font-semibold mb-2">Grooveshare Player</h2>
      {currentTrack && (
        <div className="mb-3">
          <p className="text-sm">
            {currentTrack.name} – {currentTrack.artists.map(artist => artist.name).join(', ')}
          </p>
        </div>
      )}
      <div className="flex items-center space-x-3">
        <button onClick={skipPrevious}>⏮️</button>
        <button onClick={togglePlay}>
          {isPaused ? '▶️' : '⏸️'}
        </button>
        <button onClick={skipNext}>⏭️</button>
      </div>
    </div>
  );
}
