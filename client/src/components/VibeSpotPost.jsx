import React, { useEffect, useState } from "react";
import { vibespotImageUrl, userImageUrl } from "../services/apicalls";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { avatar, notFound3 } from "../constants/images";
import { CgComment } from "react-icons/cg";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { RiMapPin5Line, RiMapPin5Fill } from "react-icons/ri";
import "@splidejs/react-splide/css";
import { useSelector } from "react-redux";

const VibeSpotPost = ({
  vibeSpotDetail,
  pickedLocation,
  isLocationPicked,
  setModalVibeSpotId,
  setShowModal,
  setShowViewComponent,
}) => {
  const currentPos = [pickedLocation[0], pickedLocation[1]]; // Initialize position directly
  const position = [
    vibeSpotDetail.location.coordinates[1],
    vibeSpotDetail.location.coordinates[0],
  ];

  const isLoggedIn = useSelector((state) => state.auth.loginSession);
  const userInfo = useSelector((state) => state.auth.currentUser);
  const dateOnly = vibeSpotDetail.createdAt.split("T")[0];

  let liked = userInfo?.liked_vibespot?.some((id) => id === vibeSpotDetail._id);
  let visited = userInfo?.been_to_vibespot?.some(
    (id) => id === vibeSpotDetail._id
  );
  // console.log(vibeSpotDetail._id, liked);
  // console.log(vibeSpotDetail._id, visited);

  /**
   * Calculating the Ratings to display
   */
  const rating = vibeSpotDetail.rating;
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  //Map url Formation
  //https://maps.google.com/maps?saddr=28.612894,77.229446&daddr=28.4622848,77.053952
  const mapURL =
    "https://maps.google.com/maps?saddr=" +
    currentPos[0] +
    "," +
    currentPos[1] +
    "&daddr=" +
    position[0] +
    "," +
    position[1];
  //https://www.google.com/maps/dir/28.612894,77.229446/28.4622848,77.053952

  return (
    <div className="miniVibeSpotOuterDiv">
      <div className="miniVibeSpotInnerDiv">
        <div
          className="headingDiv title_div"
          onClick={() => {
            console.log(vibeSpotDetail._id);
            setModalVibeSpotId(vibeSpotDetail?._id);
            setShowModal(true);
            setShowViewComponent("map");
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <h1>{vibeSpotDetail.title}</h1>
            <div className="ratingDiv">
              <div className="star-rating">
                {/* Render full stars */}
                {"★".repeat(fullStars)}

                {/* Render half star */}
                {halfStar && "☆"}

                {/* Render empty stars */}
                {"☆".repeat(emptyStars)}
              </div>
              <p>(&nbsp;{rating}&nbsp;)</p>
            </div>
          </div>

          <p>
            <span>
              <a href={mapURL} target="blank">
                {isLocationPicked ? (
                  <>Show Directions</>
                ) : (
                  <>Location Permission Required!!</>
                )}
              </a>
            </span>
          </p>
        </div>
        <div className="des_div">{vibeSpotDetail.description}</div>
        <div className="carouselBox">
          <Splide
            className="splideCarouselBox"
            options={{
              rewind: true,
              height: "400px",
              width: "100%",
            }}
            aria-label="My Favorite Images"
          >
            {vibeSpotDetail.vibeSpotImagePath?.map((imagePath, index) => (
              <SplideSlide key={index}>
                <img
                  src={vibespotImageUrl + imagePath}
                  alt={` ${index + 1}`}
                  onError={(e) => {
                    e.target.onerror = null; // Prevents looping
                    e.target.src = notFound3; // Fallback URL for the image
                  }}
                />
              </SplideSlide>
            ))}
          </Splide>
          <p
            style={{
              color: "#797979",
              fontSize: "10px",
              marginTop: "5px",
            }}
          >
            Posted On : {dateOnly}
          </p>
        </div>

        <div className="metaDiv">
          <div className="userMeta">
            <img
              src={
                vibeSpotDetail.userId?.userPicturePath !== ""
                  ? userImageUrl + vibeSpotDetail.userId?.userPicturePath
                  : avatar
              }
              alt={vibeSpotDetail.userId?.firstName}
              onError={(e) => {
                e.target.onerror = null; // Prevents looping
                e.target.src = avatar; // Fallback URL for the image
              }}
            />
            <p>
              {vibeSpotDetail.userId?.firstName}{" "}
              {vibeSpotDetail.userId?.lastName}
            </p>
          </div>
        </div>

        <hr />

        <div className="actionsDiv">
          <div
            className="likeDiv"
            onClick={() => {
              console.log(vibeSpotDetail._id);
              setModalVibeSpotId(vibeSpotDetail?._id);
              setShowModal(true);
              setShowViewComponent("like");
            }}
          >
            {isLoggedIn && liked && <FaHeart className="heartFill" />}
            {!liked && <FaRegHeart className="heartLine" />}
            Like ({vibeSpotDetail.likes?.length})
          </div>

          <div
            className="commentMapDiv"
            onClick={() => {
              console.log(vibeSpotDetail._id);
              setModalVibeSpotId(vibeSpotDetail?._id);
              setShowModal(true);
              setShowViewComponent("comment");
            }}
          >
            <CgComment className="commentLine" />
            Comment ({vibeSpotDetail.comments?.length})
          </div>

          <div
            className="visitedDiv"
            onClick={() => {
              console.log(vibeSpotDetail._id);
              setModalVibeSpotId(vibeSpotDetail?._id);
              setShowModal(true);
              setShowViewComponent("visited");
            }}
          >
            {visited && <RiMapPin5Fill className="locationFill" />}
            {!visited && <RiMapPin5Line className="locationLine" />}
            Already Visited ({vibeSpotDetail.visitedBy?.length})
          </div>
        </div>
      </div>
    </div>
  );
};

export default VibeSpotPost;
