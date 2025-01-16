import React, { useEffect, useState } from "react";
import VibeSpotPost from "./VibeSpotPost";
import { MutatingDots } from "react-loader-spinner";

const VibeSpotPostList = ({
  userVibeSpotList,
  pickedLocation,
  isLocationPicked,
  setModalVibeSpotId,
  setShowModal,
  setShowViewComponent,
}) => {
  // console.log(userVibeSpotList);
  return (
    <div className="vibeSpotPostListDiv">
      <div className="list">
        {/* Show loading spinner while data is being fetched */}

        {userVibeSpotList.length !== 0 ? (
          <>
            {userVibeSpotList.map((vibeSpotDetail) => (
              <VibeSpotPost
                key={vibeSpotDetail._id}
                vibeSpotDetail={vibeSpotDetail}
                pickedLocation={pickedLocation}
                isLocationPicked={isLocationPicked}
                setModalVibeSpotId={setModalVibeSpotId}
                setShowModal={setShowModal}
                setShowViewComponent={setShowViewComponent}
              />
            ))}
          </>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <p
              style={{
                color: "#570de6",
                textAlign: "center",
                fontSize: "20px",
                fontWeight: "700",
              }}
            >
              Nothing to show...
            </p>
          </div>
        )}

        {/* Render the list of VibeSpotPost components when count > 0 */}
      </div>
    </div>
  );
};

export default VibeSpotPostList;
