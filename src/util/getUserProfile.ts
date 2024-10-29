import { currentToken } from "./currentToken";

type UserProfileResponse = {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string | null;
    total: number;
  };
  href: string;
  id: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  product: string;
  type: string;
  uri: string;
};

export const getUserProfile = async () => {
  const spotifyUrl = "https://api.spotify.com/v1/me";

  return fetch(spotifyUrl, {
    headers: {
      Authorization: `Bearer ${currentToken.access_token}`,
    },
  })
    .then((response) => {
      console.log("response", response);
      return response.json();
    })
    .then((jsonResponse: UserProfileResponse) => {
      console.log("jsonResponse", jsonResponse);
      return jsonResponse;
    });
};
