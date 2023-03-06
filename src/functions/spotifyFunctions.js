import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

export const authenticate = (accessToken) => {
  spotifyApi.setAccessToken(accessToken);
};

export const getTopArtists = () => {
  return spotifyApi.getMyTopArtists({ time_range: "short_term", limit: 10 });
};

export const getTimeSpentOnSpotify = () => {
  return spotifyApi.getMyRecentlyPlayedTracks({ limit: 50 }).then((tracks) => {
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
