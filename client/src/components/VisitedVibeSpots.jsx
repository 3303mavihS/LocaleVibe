import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverFetchVisitedVibeSpots } from "../services/apicalls";
import VibeSpotPostList from "./VibeSpotPostList";
import "./styles/FeedModal.css";
import { setVisibleRightSideBar } from "../features/headerElementReducer";
import VibeSpot from "./VibeSpot";
import { MutatingDots } from "react-loader-spinner";

const VisitedVibeSpots = () => {
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
  const [isLoading, setIsLoading] = useState(true);

  const userId = user?._id;
  // console.log(user);
  // console.log(userId);

  const getMyVibeSpot = async (userId) => {
    if (!userId) {
      // console.log("UserId is undefined. Skipping API call.");
      return;
    }
    try {
      const url = `${serverFetchVisitedVibeSpots}/${userId}`;
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
        // console.log("Visited Feed Data:", data);
        setUserVibeSpotList(data);
        setServerCode(response.status);
        setIsLoading(false);
      } else {
        // console.log("Server returned status:", response.status);
        setServerCode(response.status);
      }
    } catch (err) {
      console.error("Error fetching VibeSpots:", err.message);
    }
  };
  // console.log(userVibeSpotList);
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
            setShowModal={setShowModal}
            showViewComponent={showViewComponent}
          />
        </div>
      )}
      {!showModal &&
        (!isLoading ? (
          <VibeSpotPostList
            isLocationPicked={isLocationPicked}
            pickedLocation={pickedLocation}
            userVibeSpotList={userVibeSpotList.reverse()}
            setModalVibeSpotId={setModalVibeSpotId}
            setShowModal={setShowModal}
            setShowViewComponent={setShowViewComponent}
          />
        ) : (
          <MutatingDots
            visible={true}
            height="100"
            width="100"
            color="#570de6"
            secondaryColor="#b194e9"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        ))}
    </div>
  );
};

export default VisitedVibeSpots;
