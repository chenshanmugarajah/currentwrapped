import React from "react";
import "./Homepage.scss";

const client_id = "757c22352a1648c69c3ddd9212edb141";
const redirect_uri = "http://localhost:3000/currentwrapped";
const scope = "user-top-read user-read-recently-played";
const url = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=token&scope=${scope}&show_dialog=true`

function HomePage() {
  return (
    <div className="Homepage">
      <h1 data-testid="homepage-header">Welcome to CurrentWrapped</h1>
      <p>To use this app, you must log in with Spotify</p>
      <a data-testid="login-button" href={url}>
        Log in
      </a>
    </div>
  );
}

export default HomePage;
