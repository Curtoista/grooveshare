const yelpKey = 'DQH2Bbchmuo33M6B-qivsJ9IHZL0HoEUDFUXTXfR1cNc_DZr2b2O_t5KjrEIaO7gJrMUAvDrTCCor60x5AFA5_KqMP0fq87OXwGD5cZl29UVOGq-GTIyMUKzE2zgZnYx';
const yelpURL = 'https://api.yelp.com/v3/businesses/search';

const Spotify = {
    search(term, location, sortBy) {
      return fetch(
        `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
        {
          headers: {
            Authorization: `Bearer ${yelpKey}`,
          },
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((jsonResponse) => {
          if (jsonResponse.businesses) {
            return jsonResponse.businesses.map((business) => ({
              id: business.id,
              imageSrc: business.image_url,
              name: business.name,
              address: business.location.address1,
              city: business.location.city,
              state: business.location.state,
              zipCode: business.location.zip_code,
              category: business.categories[0].title,
              rating: business.rating,
              reviewCount: business.review_count,
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
//             id: business.id,
//             imageSrc: business.image_url,
//             name: business.name,
//             address: business.location.address1,
//             city: business.location.city,
//             state: business.location.state,
//             zipCode: business.location.zip_code,
//             category: business.categories[0].title,
//             rating: business.rating,
//             reviewCount: business.review_count,
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
//               id: business.id,
//               imageSrc: business.image_url,
//               name: business.name,
//               address: business.location.address1,
//               city: business.location.city,
//               state: business.location.state,
//               zipCode: business.location.zip_code,
//               category: business.categories[0].title,
//               rating: business.rating,
//               reviewCount: business.review_count,
//             }));
//           }
//         });
//     },
//   };
