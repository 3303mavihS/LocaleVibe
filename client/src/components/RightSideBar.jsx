import React from "react";
import "../components/styles/RightSideBar.css";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import FriendsList from "./FriendsList";
import InfoList from "./InfoList";

const RightSideBar = () => {
  const likeslistData = useSelector((state) => state.vibespotInfoPart.likes);
  const visitedBylistData = useSelector(
    (state) => state.vibespotInfoPart.likes
  );
  return (
    <div className="rightSideBarDiv">
      <div className="rightSideBarDivMain">
        <Routes>
          <Route path="/dashboard/friends" element={<FriendsList />} />
          <Route
            path="/vibespot/:vibespotId/likes"
            element={
              <InfoList
                listData={likeslistData}
                placeholder="Search Person in Likes"
                contentHeading="Liked By People :"
              />
            }
          />
          <Route
            path="/vibespot/:vibespotId/visited-by"
            element={
              <InfoList
                listData={visitedBylistData}
                placeholder="Search Person in Visited By"
                contentHeading="Visited By People :"
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default RightSideBar;
