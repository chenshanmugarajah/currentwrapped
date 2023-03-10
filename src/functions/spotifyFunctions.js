import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

export const authenticate = (accessToken) => {
  spotifyApi.setAccessToken(accessToken);
};

export const getTopArtists = () => {
  return spotifyApi.getMyTopArtists({ time_range: "medium_term", limit: 5 });
};

export const getTimeSpentOnSpotify = () => {
  const currentDate = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(currentDate.getMonth() - 6);
  const unixTimeMs = sixMonthsAgo.getTime();

  return spotifyApi.getMyRecentlyPlayedTracks({ limit: 50, after: unixTimeMs }).then((tracks) => {
    const totalDuration = tracks.items.reduce(
      (acc, cur) => acc + cur.track.duration_ms,
      0
    );
    const hours = Math.floor((totalDuration / 1000 / 60 / 60) % 24);
    const minutes = Math.floor((totalDuration / 1000 / 60) % 60);
    const seconds = Math.floor((totalDuration / 1000) % 60);
    return `${hours} hours ${minutes} minutes ${seconds} seconds`;
  });
};

export const getTopTracks = () => {
  return spotifyApi.getMyTopTracks({ time_range: "medium_term", limit: 5});
}

export const getRecommendations = (artists, tracks, limit) => {
  return spotifyApi.getRecommendations({
    seed_artists: artists,
    seed_tracks: tracks,
    limit: limit
  })
  .then(data => console.log(data))
  .catch((error) => console.log("ERROR ", error));
}

