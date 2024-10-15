type AuthResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
};
// Data structure that manages the current active token, caching it in localStorage
export const currentToken = {
  get access_token() {
    return localStorage.getItem("access_token") || null;
  },
  get refresh_token() {
    return localStorage.getItem("refresh_token") || null;
  },
  get expires_in() {
    return localStorage.getItem("refresh_in") || null;
  },
  get expires() {
    return localStorage.getItem("expires") || null;
  },

  save: function (response: AuthResponse) {
    const { access_token, refresh_token, expires_in } = response;
    console.log("Saving token", response);
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    // localStorage.setItem("expires_in", expires_in.toString());

    const now = new Date();
    // const expiry = new Date(now.getTime() + expires_in * 1000);
    // localStorage.setItem("expires", expiry.toString());
  },
};
