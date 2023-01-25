const clientId = "79f52346df4f474a8b8d82fe59ddc635";
const clientSecret = "fca915a0163648b493df84d61b6c5172";
const redirecturi = "http://127.0.0.1:5500/spotify.html";
const scopes = [
  "user-read-private",
  "user-library-read",
  "user-library-modify",
  "user-read-playback-state",
  "user-read-currently-playing",
  "user-modify-playback-state",
];
let code = "";
const tokenUrl = "https://accounts.spotify.com/api/token";
const auth = btoa(`${clientId}:${clientSecret}`);
const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${auth}`,
  },
  body: "grant_type=client_credentials",
};

// Redirect the user to the Spotify authorization page
function redirectToSpotifyAuth() {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirecturi}&scope=${scopes.join(
    "%20"
  )}`;
  window.location = authUrl;
}

// Handle the redirect back to the application
async function handleAuthCallback() {
  try {
    const params = new URLSearchParams(window.location.search);
    code = params.get("code");
    console.log(code);
  } catch (error) {
    console.error(error);
  }
}

// Check for the auth callback
if (window.location.href.includes("code")) {
  handleAuthCallback();
} else {
  redirectToSpotifyAuth();
}

fetch(tokenUrl, options)
  .then((response) => response.json())
  .then((data) => {
    console.log(data.access_token);
  })
  .catch((error) => {
    console.log("Error", error);
  });
