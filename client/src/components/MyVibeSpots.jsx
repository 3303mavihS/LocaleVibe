import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverFetchMyVibeSpots } from "../services/apicalls";
import VibeSpotPostList from "./VibeSpotPostList";
import "./styles/FeedModal.css";
import { setVisibleRightSideBar } from "../features/headerElementReducer";
import VibeSpot from "./VibeSpot";

const MyVibeSpots = () => {
  //function to get the vibespot created by the user
  const user = useSelector((state) => state.auth.currentUser);
  const userToken = useSelector((state) => state.auth.sessionToken);
  const isLocationPicked = useSelector(
    (state) => state.locationInfo.isLocationPicked
  );
  const pickedLocation = useSelector(
    (state) => state.locationInfo.pickedLocation
  );
  const dispatch = useDispatch();
  const [serverCode, setServerCode] = useState(0);
  const [userVibeSpotList, setUserVibeSpotList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showViewComponent, setShowViewComponent] = useState("");
  const [modalVibeSpotId, setModalVibeSpotId] = useState("");
  const userId = user?._id;
  // console.log(user);
  // console.log(userId);

  const getMyVibeSpot = async (userId) => {
    if (!userId) {
      console.log("UserId is undefined. Skipping API call.");
      return;
    }
    try {
      const url = `${serverFetchMyVibeSpots}/${userId}`;
      // console.log("Fetching URL:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userToken}`,
        }, // Add other headers if required
      });

      if (response.status === 200) {
        // console.log("Response Status:", response.status);
        const data = await response.json();
        // console.log("Data:", data);
        setUserVibeSpotList(data);
        setServerCode(response.status);
      } else {
        // console.log("Server returned status:", response.status);
        setServerCode(response.status);
      }
    } catch (err) {
      console.error("Error fetching VibeSpots:", err.message);
    }
  };

  useEffect(() => {
    if (userId) {
      getMyVibeSpot(userId);
    }
    dispatch(setVisibleRightSideBar(false));
  }, [userId, showModal, user]); // Only run when userId changes

  return (
    <div className="vibeSpotListMainDiv">
      {showModal && (
        <div className="modal">
          <VibeSpot
            id={modalVibeSpotId}
            isLocationPicked={isLocationPicked}
            pickedLocation={pickedLocation}
            setShowModal={setShowModal}
            showViewComponent={showViewComponent}
          />
        </div>
      )}
      {!showModal && (
        <VibeSpotPostList
          isLocationPicked={isLocationPicked}
          pickedLocation={pickedLocation}
          userVibeSpotList={userVibeSpotList}
          setModalVibeSpotId={setModalVibeSpotId}
          setShowModal={setShowModal}
          setShowViewComponent={setShowViewComponent}
        />
      )}
    </div>
  );
};

export default MyVibeSpots;
