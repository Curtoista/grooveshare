import { currentToken } from "./currentToken";

type PlaylistResponseBody = {
  name: string;
  description: string;
  public: boolean;
};

export const createPlaylist = (userId: string, playlistTitle:string) => {
  const spotifyUrl = `https://api.spotify.com/v1/users/${userId}/playlists`;

  return fetch(spotifyUrl, {
    headers: {
      Authorization: `Bearer ${currentToken.access_token}`,
    },
    method: "POST",
    body: JSON.stringify({
      name: playlistTitle,
      description: "My description",
      public: false,
    }),
  })
    .then((response) => {
      console.log("response", response);
      return response.json();
    })
    .then((jsonResponse) => {
      console.log("successfully created playlist");
      console.log("jsonResponse", jsonResponse);
      return jsonResponse;
    })
    .catch((error) => {
      console.error("Error fetching tracks", error);
    });
};
