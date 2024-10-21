import { currentToken } from "./currentToken";

type TrackResponse = {
  id: string;
  name: string;
  artists: any;
  album: any
  review_count: number;
};

export const searchTracks = (searchTerm: string) => {
  const spotifyUrl = "https://api.spotify.com/v1/search";

  return fetch(`${spotifyUrl}?q=${searchTerm}&type=track`, {
    headers: {
      Authorization: `Bearer ${currentToken.access_token}`,
    },
  })
    .then((response) => {
      console.log("response", response);
      return response.json();
    })
    .then((jsonResponse) => {
      console.log("jsonResponse", jsonResponse);
      if (jsonResponse.tracks) {
        return jsonResponse.tracks.items.map((track: TrackResponse) => ({
          id: track.id,
          name: track.name,
          artists: track.artists[0].name,
          album: track.album.name,
        }));
      }
    })
    .catch((error) => {
      console.error("Error fetching tracks", error);
    });
};