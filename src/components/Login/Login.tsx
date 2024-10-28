import React, { useState } from "react";
import { redirectToSpotifyAuthorize } from "../../util/redirectToSpotifyAuthorize";

function Login() {
  const [isLoading, setIsLoading] = useState(false);

  // Click handler for Spotify login
  async function loginWithSpotifyClick() {
    setIsLoading(true);
    try {
      await redirectToSpotifyAuthorize();
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full p-4">
      <h1 className="mb-6 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 animate-gradient-x drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl">
        Welcome to GrooveShare
      </h1>
      <button
        id="login-button"
        onClick={loginWithSpotifyClick}
        className={`px-6 py-3 text-lg font-semibold text-white bg-green-400 rounded-lg shadow-md hover:bg-green-500 focus:outline-none ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Log in with Spotify"}
      </button>
    </div>
  );
}

export default Login;
