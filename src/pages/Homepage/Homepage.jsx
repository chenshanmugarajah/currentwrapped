import React, { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import "./Homepage.scss";

const spotifyApi = new SpotifyWebApi();
const client_id = "757c22352a1648c69c3ddd9212edb141";
const redirect_uri = "http://localhost:3000/currentwrapped";
const scope = "user-top-read user-read-recently-played";
const url = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=token&scope=${scope}`

function HomePage(props) {
  useEffect(() => {
    const params = getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
      props.history.push("/currentwrapped");
    }
  }, [props.history]);

  function getHashParams() {
    const hashParams = {};
    let e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    // eslint-disable-next-line
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

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
