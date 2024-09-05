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

const MainContent = () => {
  const isLoggedIn = useSelector((state) => state.auth.loginSession);
  console.log("Logged In : ", isLoggedIn);
  return (
    <div className="mainContentDiv">
      <div className="mainContentDivMain">
        <Routes>
          <Route path="/" element={<VibeSpotPostList />} />
          <Route path="/dashboard" element={<VibeSpotPostList />} />
          <Route
            path="/dashboard/add-vibespot"
            element={
              isLoggedIn ? <AddVibeSpot /> : <Navigate to="/auth/sign-in" />
            }
          />
          <Route
            path="/dashboard/:personUsername"
            element={<PersonProfile />}
          />
          <Route
            path="/dashboard/vibespot/:vibespotId"
            element={<VibeSpotPost />}
          />
          <Route
            path="/dashboard/your-vibespots"
            element={<VibeSpotPostList />}
          />
          <Route
            path="/dashboard/liked-vibespots"
            element={<VibeSpotPostList />}
          />
          <Route
            path="/dashboard/visited-vibespots"
            element={<VibeSpotPostList />}
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
          <Route path="/auth/change-password" element={<ForgotPassword />} />
          <Route path="/vibespot/:vibespotId" element={<VibeSpot />} />
          <Route path="/vibespot/:vibespotId/likes" element={<VibeSpot />} />
          <Route
            path="/vibespot/:vibespotId/visited-by"
            element={<VibeSpot />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default MainContent;
