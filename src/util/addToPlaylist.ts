import { currentToken } from "./currentToken";

type AddToPlaylistResponseBody = {
  uris: string[];
  position: number
};

export const addToPlaylist = (playlistId: string, uris: string[]) => {
  const spotifyUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

  return fetch(spotifyUrl, {
    headers: {
      Authorization: `Bearer ${currentToken.access_token}`,
    },
    method: "POST",
    body: JSON.stringify({
      uris: uris,
      position: 0
    }),
  })
    .then((response) => {
      console.log("response", response);
      return response.json();
    })
    .then((jsonResponse) => {
      console.log("successfully added songs to your playlist");
      console.log("jsonResponse", jsonResponse);
    })
    .catch((error) => {
      console.error("Error adding tracks", error);
    });
};
