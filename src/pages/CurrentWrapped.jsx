import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import "./CurrentWrapped.scss";

const spotifyApi = new SpotifyWebApi();

function CurrentWrapped() {
  const [topArtists, setTopArtists] = useState([]);
  const [timeSpent, setTimeSpent] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const accessToken = hash.slice(1).split("&")[0].split("=")[1];
      spotifyApi.setAccessToken(accessToken);

      // Get user's top artists
      spotifyApi
        .getMyTopArtists({ time_range: "short_term", limit: 10 })
        .then((response) => {
          setTopArtists(response.items);
        })
        .catch((error) => {
          console.log(error);
        });

      // Get user's time spent on Spotify
      spotifyApi
        .getMe()
        .then((user) => {
          return spotifyApi.getMyRecentlyPlayedTracks({ limit: 50 });
        })
        .then((tracks) => {
          const totalDuration = tracks.items.reduce(
            (acc, cur) => acc + cur.track.duration_ms,
            0
          );
          const hours = Math.floor((totalDuration / 1000 / 60 / 60) % 24);
          const minutes = Math.floor((totalDuration / 1000 / 60) % 60);
          const seconds = Math.floor((totalDuration / 1000) % 60);
          setTimeSpent(`${hours} hours ${minutes} minutes ${seconds} seconds`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <div className="ParentWrapped">
      <div className="CurrentWrapped">
        <h1>Your Top Artists</h1>
        <ul>
          {topArtists.map((artist, index) => (
            <li key={index}>
              {/* <img src={artist.images[0].url} alt={artist.name} /> */}
              <p>{artist.name}</p>
            </li>
          ))}
        </ul>

        <h1>Your Time Spent on Spotify</h1>
        <p>{timeSpent}</p>
      </div>
    </div>
  );
}

export default CurrentWrapped;
