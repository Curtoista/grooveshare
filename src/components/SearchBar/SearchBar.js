import React from "react";

const SearchBar = ({ setHasSearched, setSearchTerm, searchTerm, handleSearch }) => {
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <form 
      onSubmit={(e) => { 
        e.preventDefault();
        handleSearch();  // Call handleSearch when form is submitted
      }} 
      className="bg-white p-6 rounded-lg shadow-lg w-96"
    >
      <div className="mb-4">
        <input 
          type="text"
          placeholder="Search Song Title"
          value={searchTerm}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <button 
          type="submit" 
          className="bg-blue-500 text-white rounded-lg py-2 px-4 w-full hover:bg-blue-600 transition duration-200"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
