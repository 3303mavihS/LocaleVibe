import React, { useState } from "react";
import { MdShareLocation } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { avatar } from "../constants/images";
import SearchBar from "../components/SearchBar";
import "../components/styles/Header.css";
import { setVisibleRightSideBar } from "../features/headerElementReducer";
import { useDispatch, useSelector } from "react-redux";
import { TbLogout } from "react-icons/tb";
import {
  setCurrentUser,
  setLoginSession,
  setSessionToken,
} from "../features/loginReducer";
import { userImageUrl } from "../services/apicalls";
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const [showSideBar, setShowSideBar] = useState(true);
  const [downClicked, setDownClicked] = useState(false);
  const showOption = useSelector((state) => state.auth.loginSession);
  const toggleSideBar = () => {
    dispatch(setVisibleRightSideBar(!showSideBar));
    setShowSideBar(!showSideBar);
    sessionStorage.setItem("hideRightSideBar", !showSideBar);
  };
  const isLoggedIn = useSelector((state) => state.auth.loginSession);
  const userInfo = useSelector((state) => state.auth.currentUser);
  return (
    <div className="headerDiv">
      <div className="headerDivMain">
        <div className="logoDiv">
          <MdShareLocation className="logoicon" />
          <div className="title">
            <span>LocaleVibe</span>
          </div>
        </div>

        <div className="searchDiv">
          <SearchBar />
        </div>

        <div className="profileDiv ">
          {showOption && (
            <div className="picture">
              <img
                src={
                  userInfo && userInfo.userPicturePath
                    ? userImageUrl + userInfo.userPicturePath
                    : avatar
                }
                alt="profile-pic"
              />
            </div>
          )}
          {showOption && (
            <MdKeyboardArrowDown
              className="downicon"
              onClick={() => {
                setDownClicked(!downClicked);
              }}
            />
          )}
          {downClicked && (
            <div className="dropiconDiv">
              <div
                style={{ display: "flex", alignItems: "center" }}
                onClick={() => {
                  setDownClicked(!downClicked);
                  dispatch(setCurrentUser([]));
                  dispatch(setLoginSession(false));
                  dispatch(setSessionToken(""));
                  localStorage.removeItem("Token");
                  localStorage.removeItem("LoggedIn");
                  localStorage.removeItem("UserId");
                  sessionStorage.removeItem("SessionInfo");
                }}
              >
                <TbLogout className="optionIcon" /> Logout
              </div>
            </div>
          )}
          {!isLoggedIn && (
            <p>
              <span
                style={{
                  fontSize: "15px",
                  fontWeight: "700",
                  color: "#570DE6",
                }}
              >
                <Link to="../auth/sign-in">Sign In</Link>
              </span>
            </p>
          )}
          <MdDashboard
            className="rightsidebartoggleicon"
            onClick={toggleSideBar}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
