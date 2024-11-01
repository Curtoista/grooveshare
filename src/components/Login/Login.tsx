import React, { useState, useEffect } from "react";
import { redirectToSpotifyAuthorize } from "../../util/redirectToSpotifyAuthorize";
import { getUserProfile } from "../../util/getUserProfile";

// Define a type for the user information
type UserInfo = {
  name: string;
  imageUrl: string;
} | null;

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>(null); // Use UserInfo type, allow initial null
  const [error, setError] = useState<string | null>(null); // Error handling

  // Fetch user information after login
  const fetchUserInfo = async () => {
    try {
      setIsLoading(true);
      const data = await getUserProfile(); // Fetch user profile
      setUserInfo({
        name: data.display_name,
        imageUrl: data.images[0]?.url || "", // Use the first profile image if available
      });
      setError(null); // Clear error if fetch is successful
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      setError("Failed to fetch profile. Please try logging in again.");
      setUserInfo(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Check if there is a token and fetch user info on component mount
    if (localStorage.getItem("access_token")) {
      fetchUserInfo();
    }
  }, []);

  // Click handler for Spotify login
  async function loginWithSpotifyClick() {
    setIsLoading(true);
    try {
      await redirectToSpotifyAuthorize();

      // After authorization, immediately attempt to fetch user profile info
      if (localStorage.getItem("access_token")) {
        fetchUserInfo();
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full p-4">
      <h1 className="mb-6 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 animate-gradient-x drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl">
        Welcome to GrooveShare
      </h1>
      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
      <button
        id="login-button"
        onClick={userInfo ? undefined : loginWithSpotifyClick} // Disable click if user is already logged in
        className={`flex items-center justify-center min-w-[300px] min-h-[50px] px- py-3 text-lg font-semibold text-white bg-green-400 rounded-lg shadow-md hover:bg-green-500 focus:outline-none ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isLoading}
      >
        {isLoading ? (
          "Loading..."
        ) : userInfo ? (
          <>
            <img
              src={userInfo.imageUrl || "default_profile.png"} // Add a placeholder image
              alt="User profile"
              className="w-10 h-10 rounded-full mr-2"
            />
            <span>{`${userInfo.name}`}</span>
          </>
        ) : (
          "Log in with Spotify"
        )}
      </button>
    </div>
  );
}

export default Login;
