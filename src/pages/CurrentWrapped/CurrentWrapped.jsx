import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./CurrentWrapped.scss";
import {
  authenticate,
  getTopArtists,
  getTimeSpentOnSpotify,
  getTopTracks,
  getRecommendations,
} from "../../functions/spotifyFunctions.js";
import { Link } from "react-router-dom";

function CurrentWrapped() {
  const [topArtists, setTopArtists] = useState([]);
  const [timeSpent, setTimeSpent] = useState("");
  const [topTracks, setTopTracks] = useState();

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

    getTopTracks()
      .then((response) => {
        setTopTracks(response.items);
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

  const generateRecommend = () => {
    if (topTracks && topTracks.length > 0) {
      const artists = topArtists.map((obj) => obj.id.toString());
      const tracks = topTracks.map((obj) => obj.id.toString());
      const limit = 5;
      getRecommendations(artists, tracks, limit);
    }
  };

  return (
    <div className="parentWrapped">
      <Navbar />
      {topArtists.length > 1 ? (
        <div className="currentWrapped">
          <div className="topArtists">
            <h1 data-testid="currentwrapped-header">Your Top Artists</h1>
            <img src={topArtists[0].images[0].url} alt={topArtists[0].name} />
            <ul>
              {topArtists.map((artist, index) => (
                <li key={index}>
                  <p>
                    {index + 1}
                    {". "}
                    {artist.name}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="timeSpent">
            <h1>Your Time Spent on Spotify</h1>
            <p>{timeSpent}</p>
          </div>
          <div className="topTracks">
            <h1 data-testid="currentwrapped-header">Your Top Tracks</h1>
            <img
              src={topTracks[0].album.images[0].url}
              alt={topTracks[0].name}
            />
            <ul>
              {topTracks.map((track, index) => (
                <li key={index}>
                  <p>
                    {index + 1}
                    {". "}
                    {track.name}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="recommendations">
            <button onClick={generateRecommend}>Get Recommended Songs</button>
          </div>
        </div>
      ) : (
        <h3>
          Please log in again
          <Link to="/">Log in</Link>
        </h3>
      )}
      <Footer />
    </div>
  );
}

export default CurrentWrapped;
