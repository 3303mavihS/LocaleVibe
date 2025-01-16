import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import LeftSideBar from "./LeftSideBar";
import MainContent from "./MainContent";
import RightSideBar from "./RightSideBar";
import "../components/styles/Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsLocationPicked,
  setPickedLocation,
} from "../features/locationReducer";

const Dashboard = () => {
  const isLoggedIn = useSelector((state) => state.auth.loginSession);
  const showSideBar = useSelector((state) => state.header.visibleRightSideBar);
  const [lat, setLat] = useState(28.612894);
  const [long, setLong] = useState(77.229446);
  const [position, setPosition] = useState([28.612894, 77.229446]); // Initialize position directly
  const [locationPicked, setLocationPicked] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const dispatch = useDispatch();

  //Location permission should be taken on the dashboard login
  //GeoLoaction Options
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  //success function
  const success = (pos) => {
    var crd = pos.coords;
    setLat(crd.latitude);
    setLong(crd.longitude);
    setPosition([crd.latitude, crd.longitude]);
    dispatch(setPickedLocation([crd.latitude, crd.longitude]));
    setLocationPicked(true);
    dispatch(setIsLocationPicked(true));
    // console.log("Your current position is:");
    // console.log(`Latitude : ${crd.latitude}`);
    // console.log(`Longitude: ${crd.longitude}`);
    // console.log(`More or less ${crd.accuracy} meters.`);
  };

  //error function
  const error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  //get User Location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "granted") {
          //If granted then you can directly call your function here
          navigator.geolocation.getCurrentPosition(success, error, options);
          dispatch(setIsLocationPicked(true));
          setLocationPicked(true);
          setShowNotification(false);
        } else if (result.state === "prompt") {
          //If prompt then the user will be asked to give permission
          navigator.geolocation.getCurrentPosition(success, error, options);
          dispatch(setIsLocationPicked(false));
          setLocationPicked(false);
          setShowNotification(true);
        } else if (result.state === "denied") {
          //If denied then you have to show instructions to enable location
          dispatch(setIsLocationPicked(false));
          setLocationPicked(false); //code to open messagebox modal
          setShowNotification(true);
        }
      });
    } else {
      console.warn("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, [locationPicked]);

  return (
    <div className="dashboardDiv">
      <div className="dashboardDivMain">
        <div className="leftDiv">
          {isLoggedIn && <LeftSideBar className="left" />}
        </div>
        {/* <div className={`centerDiv ${showSideBar ? "strechCenterDiv" : ""}`}> */}
        <div className={`centerDiv ${!isLoggedIn ? "strechCenterDiv" : ""}`}>
          {showNotification && isLoggedIn && (
            <div className="notificationMainDiv">
              <div className="notificationContentDiv">
                {!locationPicked && (
                  <p>
                    Please set the Location by clicking " ⓘ " in the URL box.
                  </p>
                )}
              </div>
            </div>
          )}
          <MainContent className="center" />
        </div>
        {/* <div className={`rightDiv ${showSideBar ? "hidesideBar" : ""}`}>
          <RightSideBar className="right" />
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
