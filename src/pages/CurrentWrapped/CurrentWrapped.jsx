import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./CurrentWrapped.scss";
import { authenticate, getTopArtists, getTimeSpentOnSpotify } from "../../functions/spotifyFunctions.js";

function CurrentWrapped() {
  const [topArtists, setTopArtists] = useState([]);
  const [timeSpent, setTimeSpent] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const accessToken = hash.slice(1).split("&")[0].split("=")[1];
      authenticate(accessToken);
    }

    getTopArtists()
      .then((response) => {
        setTopArtists(response.items);
      })
      .catch((error) => {
        console.log(error);
      });

    getTimeSpentOnSpotify()
      .then((timeSpent) => {
        setTimeSpent(timeSpent);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="ParentWrapped">
      <Navbar />
      <div className="CurrentWrapped">
        <h1 data-testid="currentwrapped-header" >Your Top Artists</h1>
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
