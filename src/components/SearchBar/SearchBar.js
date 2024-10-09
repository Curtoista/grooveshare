import React, { useState } from "react";

const SearchBar = ({setHasSearched, setSearchTerm, searchTerm}) => {
   

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Searching for:", searchTerm);
    };

    return (
            <form 
                onSubmit={handleSubmit} 
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
                        onClick={() => setHasSearched(true)}
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
