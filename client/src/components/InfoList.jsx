import React, { useState } from "react";
import "../components/styles/InfoList.css";
import SearchBar from "./SearchBar";
import ListElement from "./ListElement";

const InfoList = ({ listData, placeholder, contentHeading }) => {
  const [query, setQuery] = useState("");
  return (
    <div className="listMainDiv">
      <div className="searchBox">
        <SearchBar query={query} placeholder={placeholder} />
      </div>
      <hr />
      <div className="headingBox">
        <h3>{contentHeading}</h3>
      </div>
      <div className="listBox">
        <div className="listWrapper">
          {listData?.map((listItem) => (
            <ListElement key={listItem._id} data={listItem} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoList;
