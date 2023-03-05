import querystring from "querystring";

const Homepage = () => {
  const client_id = "757c22352a1648c69c3ddd9212edb141";
  const scope =
    "user-top-read user-library-read user-read-email user-read-private user-read-recently-played user-read-playback-position user-follow-read playlist-read-collaborative playlist-read-private user-read-currently-playing user-read-playback-state";
  const redirect_uri = "http://localhost:3000/currentwrapped";
  const state = "chen";

  const query = querystring.stringify({
    response_type: "code",
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state,
  });

  const url = "https://accounts.spotify.com/authorize?" + query;

  return (
    <>
      <h1>Welcome to Current Wrapped</h1>
      <p>See your current Spotify stats in one place</p>
      <a href={url}>Log in with Spotify</a>
    </>
  );
};

export default Homepage;
