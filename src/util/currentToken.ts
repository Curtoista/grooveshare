type AuthResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
};

const tokenEndpoint = "https://accounts.spotify.com/api/token";
const clientId = "9c6878c94a22495f8ba95a94cf0ad358";

export const currentToken = {
  get access_token() {
    return localStorage.getItem("access_token") || null;
  },

  get refresh_token() {
    return localStorage.getItem("refresh_token") || null;
  },

  get expires_in() {
    return localStorage.getItem("expires_in") || null;
  },

  get expires() {
    return localStorage.getItem("expires") || null;
  },

  isExpired(): boolean {
    const expires = this.expires;
    if (!expires) return true;
    const now = new Date();
    const expiry = new Date(expires);
    return now >= expiry;
  },

  async refresh(): Promise<void> {
    const refresh_token = this.refresh_token;
    if (!refresh_token) throw new Error("No refresh token available");

    const body = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
      client_id: clientId,
    });

    const response = await fetch(tokenEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("Token refresh failed", data);
      throw new Error("Failed to refresh token");
    }

    console.log("Refreshed token", data);
    this.save(data);
  },

  save(response: AuthResponse) {
    const { access_token, refresh_token, expires_in } = response;

    localStorage.setItem("access_token", access_token);
    if (refresh_token) {
      localStorage.setItem("refresh_token", refresh_token);
    }
    localStorage.setItem("expires_in", `${expires_in}`);

    const now = new Date();
    const expiry = new Date(now.getTime() + expires_in * 1000);
    localStorage.setItem("expires", expiry.toString());
  },
};
