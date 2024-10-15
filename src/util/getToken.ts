// Soptify API Calls
const tokenEndpoint = "https://accounts.spotify.com/api/token";
const redirectUrl = "http://localhost:3000/";
const clientId = "9c6878c94a22495f8ba95a94cf0ad358";

export async function getToken(code: string) {
  console.log("Getting token with code", code);
  const code_verifier = localStorage.getItem("code_verifier") ?? "";
  const body =
    `client_id=${clientId}&grant_type=authorization_code&` +
    `code=${code}&redirect_uri=${redirectUrl}&code_verifier=${code_verifier}`;

  console.log("Code verifier", code_verifier);
  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body,
  });

  console.log("Response", response);
  const js = await response.json();
  console.log("Response body", js);

  return js;
}
