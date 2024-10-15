import React from "react";
import { redirectToSpotifyAuthorize } from "../../util/redirectToSpotifyAuthorize";

function Login() {
  // Click handlers
  async function loginWithSpotifyClick() {
    await redirectToSpotifyAuthorize();
  }

  return (
    <div>
      <h1>Welcome to Grooveshare</h1>
      <button id="login-button" onClick={() => loginWithSpotifyClick()}>
        Log in with Spotify
      </button>
    </div>
  );
}

export default Login;
