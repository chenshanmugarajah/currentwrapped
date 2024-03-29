import React, { useState, useEffect, useMemo } from "react";
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
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const accessToken = hash.slice(1).split("&")[0].split("=")[1];
      authenticate(accessToken);
    }

    Promise.all([getTopArtists(), getTopTracks(), getTimeSpentOnSpotify()])
      .then(([topArtistsResponse, topTracksResponse, timeSpent]) => {
        setTopArtists(topArtistsResponse.items);
        setTopTracks(topTracksResponse.items);
        setTimeSpent(timeSpent);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  }, []);

  const generateRecommend = async () => {
    if (topTracks && topTracks.length > 0) {
      const artists = topArtists.slice(0, 2).map((obj) => obj.id.toString());
      const tracks = topTracks.slice(0, 2).map((obj) => obj.id.toString());
      const limit = 5;
      let recommended1 = await getRecommendations(artists, tracks, limit);
      setRecommended(recommended1);
    }
  };

  const memoizedNavbar = useMemo(() => <Navbar />, []);
  const memoizedFooter = useMemo(() => <Footer />, []);

  return (
    <div className="parentWrapped">
      {memoizedNavbar}
      {topArtists && topArtists.length > 1 ? (
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
            <h1>Recommendations for you</h1>
            {recommended.length === 0 ? (
              <button onClick={generateRecommend}>Get Recommended Songs</button>
            ) : (
              <ul className="recommendation">
                {recommended.map((track, index) => (
                  <li key={index}>
                    <a href={track.external_urls.spotify}>
                      {index + 1}
                      {". "}
                      {track.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ) : (
        <div className="failed">
          <h3>Please log in again</h3>
          <Link className="link" to="/">
            Log in
          </Link>
        </div>
      )}
      {memoizedFooter}
    </div>
  );
}

export default CurrentWrapped;
