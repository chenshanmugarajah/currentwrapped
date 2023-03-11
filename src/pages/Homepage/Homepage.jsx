import React from "react";
import "./Homepage.scss";

function HomePage() {

  const scope = "user-top-read user-read-recently-played";
  const url = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=token&scope=${scope}&show_dialog=true`
  
  console.log(process.env);

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
