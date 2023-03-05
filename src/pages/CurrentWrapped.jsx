import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const CurrentWrapped = () => {
  const [tokens, setTokens] = useState({ access_token: "", refresh_token: "" });
  const [playlists, setPlaylists] = useState([]);

  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const code = params.get("code");
  const state = params.get("state");

  useEffect(() => {
    const getAccessToken = async () => {
      await fetch(
        `http://localhost:8800/api/auth/gettoken?code=${code}&state=${state}`
      )
        .then((response) => response.json())
        .then((data) => {
          setTokens(data);
        })
        .catch((error) => console.log(error));
    };
    getAccessToken();
  }, [code, state]);

  useEffect(() => {
    const getData = async () => {
      fetch("https://api.spotify.com/v1/me/playlists", {
        headers: {
          Authorization: "Bearer " + tokens.access_token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setPlaylists(data.items);
        })
        .catch((err) => console.log("error ", err));
    };
    getData();
  }, [tokens.access_token, tokens.refresh_token]);

  return (
    <div>
      <h3>Current Wrapped</h3>
      <ul>
        {playlists
          ? playlists.map((playlist) => (
              <li key={playlist.id}>Playlist name: {playlist.name}</li>
            ))
          : <p>Loading..</p>}
      </ul>
    </div>
  );
};

export default CurrentWrapped;
