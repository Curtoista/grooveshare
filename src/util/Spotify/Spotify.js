const spotifyKey = '9c6878c94a22495f8ba95a94cf0ad358';
const redirectURL = 'http://localhost:3000/';

const Spotify = {
    search(searchTerm) {
      return fetch(
        `${redirectURL}?search_term=${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${spotifyKey}`,
          },
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((jsonResponse) => {
          if (jsonResponse.tracks) {
            return jsonResponse.businesses.map((track) => ({
              id:track.id,
              name:track.name,
              artist:track.artist,
              album:track.review_count,
            }));
          }
        });
    },
  };


// const YelpSearch =  async (searchTerm, searchLocation, sortOption) => {
//     const searchParams = `?term=${searchTerm}&location=${searchLocation}&sort_by=${sortOption}`;
//     const endpoint = `${yelpURL}${searchParams}`;

//     try {
//         const response = await fetch(endpoint, 
//             {
//                 headers: {
//                     Authorization: `Bearer ${yelpKey}`,
//                 }
//             });
//         if (response.ok) {
//           const jsonResponse = await response.json();
//           return jsonResponse.businesses.map((business) => ({
//             id:track.id,
//             imageSrc:track.image_url,
//             name:track.name,
//             address:track.location.address1,
//             city:track.location.city,
//             state:track.location.state,
//             zipCode:track.location.zip_code,
//             category:track.categories[0].title,
//             rating:track.rating,
//             reviewCount:track.review_count,
//           }));
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };

    export default Spotify;
 



// const Yelp = {
//     search(term, location, sortBy) {
//       return fetch(
//         `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
//         {
//           headers: {
//             Authorization: `Bearer ${yelpKey}`,
//           },
//         }
//       )
//         .then((response) => {
//           return response.json();
//         })
//         .then((jsonResponse) => {
//           if (jsonResponse.businesses) {
//             return jsonResponse.businesses.map((business) => ({
//               id:track.id,
//               imageSrc:track.image_url,
//               name:track.name,
//               address:track.location.address1,
//               city:track.location.city,
//               state:track.location.state,
//               zipCode:track.location.zip_code,
//               category:track.categories[0].title,
//               rating:track.rating,
//               reviewCount:track.review_count,
//             }));
//           }
//         });
//     },
//   };
