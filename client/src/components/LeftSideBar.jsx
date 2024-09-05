import React from "react";
import { NavLink } from "react-router-dom";
import "../components/styles/LeftSideBar.css";
import { avatar } from "../constants/images";
import Navigation from "./Navigation";
import { LuSettings } from "react-icons/lu";
import { useSelector } from "react-redux";
import { userImageUrl } from "../services/apicalls";

const LeftSideBar = () => {
  const userInfo = useSelector((state) => state.auth.currentUser);
  //console.log(userInfo);
  return (
    <div className="leftSideBarDiv">
      <div className="leftSideBarDivMain">
        <div className="topDiv">
          <div className="onlineDiv">
            <div className="profile">
              <img
                src={
                  userInfo && userInfo.userPicturePath
                    ? userImageUrl + userInfo.userPicturePath
                    : avatar
                }
                alt="profile"
                onError={(e) => {
                  e.target.onerror = null; // Prevents looping
                  e.target.src = avatar; // Fallback URL for the image
                }}
              />
              <div className="dot"></div>
            </div>

            <div className="detail">
              <h3>
                {userInfo?.firstName && userInfo?.lastName
                  ? `${userInfo.firstName} ${userInfo.lastName}`
                  : "Guest User"}
              </h3>
              <h5>
                {userInfo?.username
                  ? `@${userInfo.username}`
                  : "@default_username"}
              </h5>
            </div>
          </div>
          <div className="optionDiv">
            <Navigation />
          </div>
        </div>
        <div className="bottomDiv">
          <NavLink className="active" to="/dashboard/profile-setting">
            <LuSettings className="navIcon" />
            Profile Setting
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
