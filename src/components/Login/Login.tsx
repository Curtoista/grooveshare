import React, { useState, useEffect } from "react";
import { redirectToSpotifyAuthorize } from "../../util/redirectToSpotifyAuthorize";
import { getUserProfile } from "../../util/getUserProfile";

type UserInfo = {
  name: string;
  imageUrl: string;
} | null;

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>(() => {
    // Initialize userInfo from localStorage if available
    const storedUserInfo = localStorage.getItem("user_info");
    return storedUserInfo ? JSON.parse(storedUserInfo) : null;
  });
  const [error, setError] = useState<string | null>(null);

  // Fetch user information and update localStorage
  const fetchUserInfo = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    try {
      setIsLoading(true);
      const data = await getUserProfile();
      const fetchedUserInfo = {
        name: data.display_name,
        imageUrl: data.images[0]?.url || "",
      };
      setUserInfo(fetchedUserInfo);
      localStorage.setItem("user_info", JSON.stringify(fetchedUserInfo)); // Save user info to localStorage
      setError(null);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      setError("Failed to fetch profile. Please try logging in again.");
      setUserInfo(null);
      localStorage.removeItem("user_info"); // Clear stored info on error
    } finally {
      setIsLoading(false);
    }
  };

  // Attempt to fetch user info if an access token is already present
  useEffect(() => {
    if (localStorage.getItem("access_token") && !userInfo) {
      fetchUserInfo();
    }
  }, [userInfo]);

  // Click handler for Spotify login
  async function loginWithSpotifyClick() {
    setIsLoading(true);
    setError(null);

    try {
      await redirectToSpotifyAuthorize();

      // After authorization, fetch user profile info
      const token = localStorage.getItem("access_token");
      if (token) {
        fetchUserInfo(); // Fetch profile after successful authorization
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
      <h1
        className="mb-6 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 animate-gradient-x drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl"
      >
        Welcome to GrooveShare
      </h1>
      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
      <button
        id="login-button"
        onClick={userInfo ? undefined : loginWithSpotifyClick}
        className={`flex items-center justify-center min-w-[300px] min-h-[50px] px-4 py-3 text-lg font-semibold text-white bg-green-400 rounded-lg shadow-md hover:bg-green-500 focus:outline-none ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isLoading}
      >
        {isLoading ? (
          "Loading..."
        ) : userInfo ? (
          // Display profile image and name if userInfo is present
          <>
            <img
              src={userInfo.imageUrl || "default_profile.png"}
              alt="User profile"
              className="w-10 h-10 rounded-full mr-2"
            />
            <span>{userInfo.name}</span>
          </>
        ) : (
          "Log in with Spotify"
        )}
      </button>
    </div>
  );
}

export default Login;
