import React, { useState } from "react";
import "../components/styles/InfoList.css";
import SearchBar from "./SearchBar";
import ListElement from "./ListElement";

const InfoList = ({ listData, placeholder, contentHeading, isLoggedIn }) => {
  const [query, setQuery] = useState("");
  console.log(listData);
  return (
    <div className="listMainDiv">
      <div className="searchBox">
        {isLoggedIn ? (
          <SearchBar
            query={query}
            placeholder={placeholder}
            inputbackgroundColor={"#fff"}
          />
        ) : (
          <div class="logInMessage">
            <span>
              <a href="/auth/sign-in">Sign In</a>
            </span>{" "}
            to Like or Visit.
          </div>
        )}
      </div>
      <hr />
      {listData?.length === 0 && (
        <div className="headingBox">
          <h3 style={{ textAlign: "center" }}>{"Be The First One."}</h3>
        </div>
      )}
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
