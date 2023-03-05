// import { Buffer } from "buffer";

// export function getUserData(code) {
//   const response = {
//     data: "",
//     loaded: "",
//   };

//   const shortTerm = {
//     method: "GET",
//     url: "https://api.spotify.com/v1/me/playlists",
//     headers: {
//       Authorization: "Bearer " + code,
//     },
//   };

//   var formattedURL = new URL(shortTerm.url);
//   if (shortTerm.params) {
//     Object.keys(shortTerm.params).forEach((key) =>
//       formattedURL.searchParams.append(key, shortTerm.params[key])
//     );
//   }

//   fetch(formattedURL, {
//     method: shortTerm.method,
//     headers: shortTerm.headers,
//   })
//     .then((res) => {
//       if (res.status >= 200 && res.status <= 299) {
//         return res.json();
//       } else {
//         if (res.status === 401) {
//           throw Error("bad or expired token");
//         } else if (res.status === 403) {
//           throw Error("bad oauth request");
//         } else if (res.status === 429) {
//           throw Error("rate limit");
//         }
//       }
//     })
//     .then((body) => {
//       response.data = body;
//       response.loaded = true;
//     })
//     .catch((error) => {
//       console.log(error);
//     });

//   return response;
// }
