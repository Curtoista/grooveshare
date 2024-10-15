import React from "react";
import { searchTracks } from "../../util/searchTracks";

const SearchBar = ({
  setHasSearched,
  setSearchTerm,
  searchTerm,
  handleSearch,
}) => {
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    searchTracks(event.target.value);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch(); // Call handleSearch when form is submitted
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
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
