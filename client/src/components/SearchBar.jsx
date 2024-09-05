import React, { useState } from "react";
import "../components/styles/SearchBar.css";
import { RiSearchLine } from "react-icons/ri";

const SearchBar = ({ query, placeholder }) => {
  const [queryInput, setQueryInput] = useState("");
  query = queryInput;
  return (
    <div className="SearchBar">
      <input
        type="text"
        name="query"
        value={queryInput}
        placeholder={placeholder}
        onChange={(e) => {
          setQueryInput(e.target.value);
          console.log(e.target.value);
        }}
      />
      <button>
        <RiSearchLine className="searchIcon" />
      </button>
    </div>
  );
};

export default SearchBar;
