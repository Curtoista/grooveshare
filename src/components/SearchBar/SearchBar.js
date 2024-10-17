import React, { useState } from "react";
import { searchTracks } from "../../util/searchTracks"; // Assuming this is a utility function that returns a promise

const SearchBar = ({
  setHasSearched,
  setSearchTerm,
  searchTerm,
  handleSearch,
}) => {
  const [isSearching, setIsSearching] = useState(false);

  const handleChange = async (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term.trim() !== "") {
      setIsSearching(true); // Set searching to true while waiting for the response
      try {
        // Fetch tracks from the API
        const tracks = await searchTracks(term); // Assuming searchTracks returns a promise
        handleSearch(tracks); // Pass the fetched tracks to handleSearch
        setHasSearched(true); // Set the search state to true
      } catch (error) {
        console.error("Error fetching tracks:", error);
      }
    } else {
      setIsSearching(false); // If no term, reset the searching state
      handleSearch([]); // Pass an empty array when there's no search term
      setHasSearched(false); // Reset search state
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault(); // Prevent page reload on form submit
        if (searchTerm.trim() !== "") {
          setHasSearched(true);
        }
      }}
      className="p-6 bg-white rounded-lg shadow-lg w-96"
    >
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Song Title"
          value={searchTerm}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white transition duration-200 bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          {isSearching ? "Searching..." : "Search"}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
