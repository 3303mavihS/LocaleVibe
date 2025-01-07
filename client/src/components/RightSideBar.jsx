import React from "react";
import "../components/styles/RightSideBar.css";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import FriendsList from "./FriendsList";

const RightSideBar = () => {
  return (
    <div className="rightSideBarDiv">
      <div className="rightSideBarDivMain">
        right Side Bar
        <Routes>
          <Route path="/dashboard/friends" element={<FriendsList />} />
          <Route path="/dashboard/messages" element={<FriendsList />} />
          <Route path="/dashboard/notifications" element={<FriendsList />} />
        </Routes>
      </div>
    </div>
  );
};

export default RightSideBar;
