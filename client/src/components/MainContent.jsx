import React from "react";
import VibeSpotPost from "./VibeSpotPost";
import VibeSpotPostList from "./VibeSpotPostList";
import AddVibeSpot from "./AddVibeSpot";
import ForgotPassword from "./ForgotPassword";
import { Routes, Route, Navigate } from "react-router-dom";
import "../components/styles/MainContent.css";
import PersonProfile from "./PersonProfile";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { useSelector } from "react-redux";
import ProfileSetting from "./ProfileSetting";
import VibeSpot from "./VibeSpot";
import MyVibeSpots from "./MyVibeSpots";
import LikedVibeSpots from "./LikedVibeSpots";
import VisitedVibeSpots from "./VisitedVibeSpots";
import UserFeed from "./UserFeed";

const MainContent = () => {
  const isLoggedIn = useSelector((state) => state.auth.loginSession);
  // console.log("Logged In : ", isLoggedIn);
  return (
    <div className="mainContentDiv">
      <div className="mainContentDivMain">
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? <UserFeed /> : <Navigate to="/auth/sign-in" />
            }
          />
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? <UserFeed /> : <Navigate to="/auth/sign-in" />
            }
          />
          <Route
            path="/dashboard/add-vibespot"
            element={
              isLoggedIn ? <AddVibeSpot /> : <Navigate to="/auth/sign-in" />
            }
          />
          <Route
            path="/dashboard/:personUsername"
            element={
              isLoggedIn ? <PersonProfile /> : <Navigate to="/auth/sign-in" />
            }
          />
          <Route
            path="/dashboard/my-vibespots"
            element={
              isLoggedIn ? <MyVibeSpots /> : <Navigate to="/auth/sign-in" />
            }
          />
          <Route
            path="/dashboard/liked-vibespots"
            element={
              isLoggedIn ? <LikedVibeSpots /> : <Navigate to="/auth/sign-in" />
            }
          />
          <Route
            path="/dashboard/visited-vibespots"
            element={
              isLoggedIn ? (
                <VisitedVibeSpots />
              ) : (
                <Navigate to="/auth/sign-in" />
              )
            }
          />
          <Route
            path="/dashboard/profile-setting"
            element={
              isLoggedIn ? <ProfileSetting /> : <Navigate to="/auth/sign-in" />
            }
          />
          <Route path="/auth/sign-up" element={<SignUp />} />
          <Route
            path="/auth/sign-in"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <SignIn />}
          />
          <Route
            path="/auth/change-password"
            element={
              isLoggedIn ? <ForgotPassword /> : <Navigate to="/auth/sign-in" />
            }
          />
          <Route path="/vibespot/:paramsId" element={<VibeSpot />} />
        </Routes>
      </div>
    </div>
  );
};

export default MainContent;
