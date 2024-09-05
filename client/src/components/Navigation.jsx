import React from "react";
import { NavLink } from "react-router-dom";
import { PiMapPinAreaBold } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { BsPersonCheck } from "react-icons/bs";
import { GrMapLocation } from "react-icons/gr";
import { BiLike } from "react-icons/bi";
import { IoImagesOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import "../components/styles/Navigation.css";
import { useSelector } from "react-redux";

const Navigation = () => {
  const isLoggedIn = useSelector((state) => state.auth.loginSession);
  return (
    <div className="navOptions">
      <NavLink to="/">
        <RxDashboard className="navIcon" />
        Your Feed
      </NavLink>
      <NavLink to="/dashboard/add-vibespot">
        <PiMapPinAreaBold className="navIcon" /> Add New VibeSpot
      </NavLink>
      <NavLink to="/dashboard/friends">
        <BsPersonCheck className="navIcon" />
        Friends
      </NavLink>
      <NavLink to="/dashboard/your-vibespots">
        <GrMapLocation className="navIcon" />
        Your VibeSpots
      </NavLink>
      <NavLink to="/dashboard/liked-vibespots">
        <BiLike className="navIcon" />
        Liked VibeSpots
      </NavLink>
      <NavLink to="/dashboard/visited-vibespots">
        <IoImagesOutline className="navIcon" />
        Visited VibeSpots
      </NavLink>
      {!isLoggedIn && (
        <NavLink to="/auth/sign-up">
          <VscAccount className="navIcon" />
          Create Account
        </NavLink>
      )}
    </div>
  );
};

export default Navigation;
