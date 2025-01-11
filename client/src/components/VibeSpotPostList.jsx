import React from "react";
import VibeSpotPost from "./VibeSpotPost";

const VibeSpotPostList = ({
  userVibeSpotList,
  pickedLocation,
  isLocationPicked,
  setModalVibeSpotId,
  setShowModal,
  setShowViewComponent,
}) => {
  return (
    <div className="vibeSpotPostListDiv">
      <div className="list">
        {/* Map through the userVibeSpotList and render a VibeSpotPost component for each item */}
        {userVibeSpotList && userVibeSpotList.length > 0 ? (
          userVibeSpotList.map((vibeSpotDetail) => (
            <VibeSpotPost
              key={vibeSpotDetail._id}
              vibeSpotDetail={vibeSpotDetail}
              pickedLocation={pickedLocation}
              isLocationPicked={isLocationPicked}
              setModalVibeSpotId={setModalVibeSpotId}
              setShowModal={setShowModal}
              setShowViewComponent={setShowViewComponent}
            />
          ))
        ) : (
          <p>No VibeSpots found!</p>
        )}
      </div>
    </div>
  );
};

export default VibeSpotPostList;
