import React from "react";
import { BrowserRouter } from "react-router-dom";
import LeftSideBar from "./LeftSideBar";
import MainContent from "./MainContent";
import RightSideBar from "./RightSideBar";
import "../components/styles/Dashboard.css";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const showSideBar = useSelector((state) => state.header.visibleRightSideBar);
  return (
    <div className="dashboardDiv">
      <div className="dashboardDivMain">
        <div className="leftDiv">
          <LeftSideBar className="left" />
        </div>
        <div className={`centerDiv ${showSideBar ? "strechCenterDiv" : ""}`}>
          <MainContent className="center" />
        </div>
        <div className={`rightDiv ${showSideBar ? "hidesideBar" : ""}`}>
          <RightSideBar className="right" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
