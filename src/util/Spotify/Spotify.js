const clientId = "9c6878c94a22495f8ba95a94cf0ad358";
const spotifyUrl = "https://api.spotify.com/v1/search?type=track";

const generateRandomString = (length) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

const sha256 = async (plain) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
};

const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

const Spotify = {
  accessToken() {},
  search(searchTerm) {
    return fetch(`${spotifyUrl}?q=${searchTerm}`, {
      headers: {
        Authorization: `Bearer ${clientId}`,
      },
    })
      .then((response) => {
        console.log("response", response);
        return response.json();
      })
      .then((jsonResponse) => {
        console.log("jsonResponse", jsonResponse);
        if (jsonResponse.tracks) {
          return jsonResponse.businesses.map((track) => ({
            id: track.id,
            name: track.name,
            artist: track.artist,
            album: track.review_count,
          }));
        }
      });
  },
};
