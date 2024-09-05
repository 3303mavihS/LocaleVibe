import React from "react";
import "../components/styles/ListElement.css";
import { userImageUrl } from "../services/apicalls.js";
import { avatar } from "../constants/images.js";
const ListElement = ({ data }) => {
  return (
    <div className="elementMainDiv">
      <div className="dp">
        <img
          src={
            data?.userPicturePath !== ""
              ? userImageUrl + data?.userPicturePath
              : avatar
          }
          alt={`${data?.firstName} ${data?.lastName}`}
          onError={(e) => {
            e.target.onerror = null; // Prevents looping
            e.target.src = avatar; // Fallback URL for the image
          }}
        />
      </div>
      <div className="nameDiv">
        <h4>{`${data?.firstName} ${data?.lastName}`}</h4>
        <p>@{data?.username}</p>
      </div>
    </div>
  );
};

export default ListElement;
