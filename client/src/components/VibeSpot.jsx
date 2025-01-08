import React, { useEffect, useState } from "react";
import "./styles/VibeSpot.css";
import { useDispatch, useSelector } from "react-redux";
import {
  serverVibeSpotUrl,
  vibespotImageUrl,
  userImageUrl,
  serverPostComment,
  serverLikeVibeSpot,
  serverVisitVibeSpot,
} from "../services/apicalls";
import { setVisibleRightSideBar } from "../features/headerElementReducer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { FaRegMap } from "react-icons/fa6";
import { GrSend } from "react-icons/gr";
import { CgComment } from "react-icons/cg";
import { RiMapPin5Line, RiMapPin5Fill } from "react-icons/ri";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { avatar, notFound3 } from "../constants/images";
import "@splidejs/react-splide/css";
import InfoList from "./InfoList";

const VibeSpot = ({ id, setShowModal, showViewComponent }) => {
  let vibespotId;
  let showBackButton;
  //http://localhost:3000/vibespot/66cb91327110738fb2ce151f
  const { paramsId } = useParams();
  // console.log(paramsId);
  /**
   * All the States
   */
  const [vibespotFound, setVibespotFound] = useState(true);
  const [vibespotInfo, setVibespotInfo] = useState({});
  const [showSideBar, setShowSideBar] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likesList, setlikesList] = useState([]);
  const [showLikedByList, setShowLikedByList] = useState(false);
  const [visited, setVisited] = useState(false);
  const [visitedByList, setVisitedByList] = useState([]);
  const [showVisitedByList, setShowVisitedByList] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [commentError, setCommentError] = useState(false);
  const [commentSuccess, setCommentSuccess] = useState(false);
  const [commentStart, setCommentStart] = useState();
  const [commentEnd, setCommentEnd] = useState();
  const [showMap, setShowMap] = useState(true);
  const [locationPicked, setLocationPicked] = useState(false);
  const [position, setPosition] = useState([28.612894, 77.229446]); // Initialize position directly
  const [currentPos, setCurrentPos] = useState([28.612894, 77.229446]);
  const [date, setDate] = useState("");

  if (id === "" || id === undefined || id === null) {
    vibespotId = paramsId;
    showBackButton = false;
  } else {
    vibespotId = id;
    showBackButton = true;
  }
  // console.log("vibespot :", vibespotId);

  const navigate = useNavigate();
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

  /**
   * All the useSelector to access the global states
   */
  const rightSideVisible = useSelector(
    (state) => state.header.visibleRightSideBar
  );
  const isLoggedIn = useSelector((state) => state.auth.loginSession);
  const userInfo = useSelector((state) => state.auth.currentUser);
  const userToken = useSelector((state) => state.auth.sessionToken);

  /**
   * All the useDispatch to dispatch the states globally
   */
  const dispatch = useDispatch();

  //get VibeSpot Info on load
  const getVibespot = async () => {
    try {
      const url = serverVibeSpotUrl + "/" + vibespotId;
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-type": "application/json" }, // Corrected 'header' to 'headers'
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        /**
         * providing data to states locally and globally
         */
        setVibespotInfo(data);
        setlikesList(data.likes);
        setVisitedByList(data.visitedBy);
        setDate(data.updatedAt);

        // Make sure location coordinates exist before setting position
        if (data.location && data.location.coordinates) {
          setPosition([
            data.location.coordinates[1], // Latitude
            data.location.coordinates[0], // Longitude
          ]);
        }

        //comment initialization
        if (data.comments?.length > 0) {
          // Initialize commentEnd to the total length of the comments
          setCommentEnd(data.comments?.length);
          // Initialize commentStart to 7 comments before the end, ensuring it doesn't go below 0
          setCommentStart(Math.max(data.comments?.length - 7, 0));
          // console.log("Start : ", Math.max(data.comments.length - 7, 0));
          // console.log("End : ", data.comments.length);
        }

        const userInfoFromSession = JSON.parse(
          sessionStorage.getItem("SessionInfo")
        );
        setLiked(
          data.likes.some((like) => like._id === userInfoFromSession._id)
        );
        setVisited(
          data.visitedBy.some((by) => by._id === userInfoFromSession._id)
        );
      } else {
        console.log("Response Status : ", response.status);
        const data = await response.json();
        console.log(data);
        setVibespotFound(false);
      }
    } catch (err) {
      console.log("error_message : ", err.message);
    }
  };

  //get User Location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "granted") {
          //If granted then you can directly call your function here
          navigator.geolocation.getCurrentPosition(success, error, options);
          setLocationPicked(true);
        } else if (result.state === "prompt") {
          //If prompt then the user will be asked to give permission
          navigator.geolocation.getCurrentPosition(success, error, options);
        } else if (result.state === "denied") {
          //If denied then you have to show instructions to enable location

          setLocationPicked(false); //code to open messagebox modal
        }
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  // strip date only from the createdAt
  const dateOnly = date.split("T")[0];
  /**
   * Calculating the Ratings to display
   */
  const rating = vibespotInfo.rating;
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  //GeoLoaction Options
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  //success function
  const success = (pos) => {
    var crd = pos.coords;
    // console.log("Your current position is:");
    // console.log(`Latitude : ${crd.latitude}`);
    // console.log(`Longitude: ${crd.longitude}`);
    // console.log(`More or less ${crd.accuracy} meters.`);
    // setLat(crd.latitude);
    // setLong(crd.longitude);
    setCurrentPos([crd.latitude, crd.longitude]);
    setLocationPicked(true);
  };
  //error function
  const error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  //post comment by sending the commentInput
  //and userId to add it to vibespot comment
  const postComment = async (commentInput) => {
    if (commentInput !== "") {
      try {
        // Define the vibespotId and userId (You need to have these available)
        const vibespotId = vibespotInfo._id; // Replace with actual vibespot ID
        //console.log(vibespotId);
        const userId = userInfo._id; // Replace with actual user ID
        //console.log(userId);

        // API endpoint to post the comment
        const url = `${serverPostComment}/${vibespotId}`;
        //console.log(url);
        // Send the comment to the server
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            userId,
            comment: commentInput,
          }),
        });

        if (response.ok) {
          const updatedVibespot = await response.json();
          setVibespotInfo(updatedVibespot);
          //console.log(updatedVibespot);
          setCommentInput("");
          setCommentSuccess(true);
        }
      } catch (err) {
        console.log("error_message : ", err.message);
        setCommentError(true);
      }
      // update the comment in the Vibespot
      // And just add the comment in the comment list
      // And don't reload the page
    }
  };

  //like post by sending userId and vibespotId
  const toggleLikeVibeSpot = async () => {
    try {
      const userId = userInfo._id;
      const url = `${serverLikeVibeSpot}/${vibespotId}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Liked By : ", data);
        setLiked(!liked);
        setlikesList(data);
      } else {
        console.log("Failed to like the Vibespot, status:", response.status);
      }
    } catch (err) {
      console.log("error_message : ", err.message);
    }
  };

  // checking visited vibespot has the userId in the visited By places
  //set visit post by sending userId and vibespotId
  const toggleVisitVibeSpot = async () => {
    try {
      const userId = userInfo._id;
      const url = `${serverVisitVibeSpot}/${vibespotId}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Visited By : ", data);
        setVisited(!visited);
        setVisitedByList(data);
      } else {
        console.log(
          "Failed to set visited the Vibespot, status:",
          response.status
        );
      }
    } catch (err) {
      console.log("error_message : ", err.message);
    }
  };

  // Previous Button Function
  const loadPrevious = () => {
    if (commentStart === 0) {
      setCommentStart(commentEnd);
    } else {
      setCommentStart(commentStart + 7);
    }
    setCommentEnd(commentEnd + 7);
    console.log("Previous loading...");
    console.log("Start : ", commentStart + 7);
    console.log("End : ", commentEnd + 7);
  };

  // Next Button Function
  const loadNext = () => {
    // Assuming you have a total number of comments or a way to check the end
    if (commentStart - 7 < 0) {
      setCommentStart(0);
    } else {
      setCommentStart(commentStart - 7);
    }

    setCommentEnd(commentEnd - 7);

    console.log("Next Loading...");

    console.log("End : ", commentEnd - 7);
  };

  //useEffect to synchronize the ui according to data loading
  useEffect(() => {
    /**
     * Call the function in useEffect show the updated data
     */
    getVibespot();
    getUserLocation();
    dispatch(setVisibleRightSideBar(true));
    if (showViewComponent === "like") {
      setShowMap(false);
      setShowSideBar(true);
      setShowLikedByList(true);
      setShowComment(false);
      setShowVisitedByList(false);
    } else if (showViewComponent === "visited") {
      setShowMap(false);
      setShowSideBar(true);
      setShowLikedByList(false);
      setShowComment(false);
      setShowVisitedByList(true);
    } else if (showViewComponent === "comment") {
      setShowSideBar(false);
      setShowMap(false);
      setShowLikedByList(false);
      setShowComment(true);
      setShowVisitedByList(false);
    } else {
      // Default case: show the map
      setShowMap(true);
      setShowSideBar(false);
      setShowLikedByList(false);
      setShowComment(false);
      setShowVisitedByList(false);
    }
    /**
     * set Message for the comment
     */
    if (commentSuccess) {
      setTimeout(() => setCommentSuccess(false), 5000);
    }
    if (commentError) {
      setTimeout(() => setCommentError(false), 5000);
    }
  }, [commentSuccess, commentError, vibespotFound]); // Run when vibespotId changes

  return (
    // <div className="onTopDiv">
    //   <div className="backgroundOverlay">
    <div className="vibespotDiv">
      {!vibespotFound && (
        <div className="notFoundDiv">
          <img src={notFound3} alt="Page Not Found" />
        </div>
      )}
      {vibespotFound && (
        <div className="vibespotDivMain">
          {/* Info Display Starts Here */}
          <div
            className={`mainContentBox ${
              !rightSideVisible ? "stretchMainBox" : ""
            }`}
          >
            <div className="headingDiv">
              <div style={{ display: "flex", alignItems: "center" }}>
                {showBackButton && (
                  <IoIosArrowDropleftCircle
                    style={{
                      width: "32px",
                      height: "32px",
                      marginRight: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setShowModal(false);
                    }}
                  />
                )}
                <h1>{vibespotInfo.title}</h1>
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
                    {locationPicked ? (
                      <>Show Directions</>
                    ) : (
                      <>Location Permission Required!!</>
                    )}
                  </a>
                </span>
              </p>
            </div>

            <div className="desDiv">
              <p>{vibespotInfo.description}</p>
            </div>

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
                {vibespotInfo.vibeSpotImagePath?.map((imagePath, index) => (
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

            <div className="infoDiv desDiv">
              {vibespotInfo?.category && (
                <p>
                  <span>VibeSpot Type</span> <br />
                  {vibespotInfo.category}
                </p>
              )}
              {vibespotInfo?.best_menu && (
                <p>
                  <span>Best Menu</span> <br />
                  {vibespotInfo.best_menu}
                </p>
              )}
              {vibespotInfo?.recommendation && (
                <p>
                  <span>Recommendation</span> <br />
                  {vibespotInfo.recommendation}
                </p>
              )}
            </div>

            <div className="metaDiv">
              <div className="userMeta">
                <img
                  src={
                    vibespotInfo.userId?.userPicturePath !== ""
                      ? userImageUrl + vibespotInfo.userId?.userPicturePath
                      : avatar
                  }
                  alt={vibespotInfo.userId?.firstName}
                  onError={(e) => {
                    e.target.onerror = null; // Prevents looping
                    e.target.src = avatar; // Fallback URL for the image
                  }}
                />
                <p>
                  {vibespotInfo.userId?.firstName}{" "}
                  {vibespotInfo.userId?.lastName}
                </p>
              </div>
            </div>

            <hr />

            <div className="actionsDiv">
              <div
                className="likeDiv"
                onClick={() => {
                  if (isLoggedIn) {
                    // only work when logged in
                    toggleLikeVibeSpot();
                  }
                }}
              >
                {liked && <FaHeart className="heartFill" />}
                {!liked && <FaRegHeart className="heartLine" />}
                <p
                  style={{ color: "#ed3326" }}
                  onClick={() => {
                    dispatch(setVisibleRightSideBar(true));
                    if (showSideBar === false) {
                      setShowSideBar(!showSideBar);
                    }
                    setShowLikedByList(true);
                    setShowVisitedByList(false);
                    setShowComment(false);
                    setShowMap(false);
                  }}
                >
                  Like ({likesList?.length})
                </p>
              </div>

              {!showComment && (
                <div
                  className="commentMapDiv"
                  onClick={() => {
                    dispatch(setVisibleRightSideBar(true));
                    setShowComment(true);
                    setShowMap(false);
                    setShowSideBar(false);
                  }}
                >
                  <CgComment className="commentLine" />
                  <p style={{ color: "#570de6" }}>
                    Comment ({vibespotInfo.comments?.length})
                  </p>
                </div>
              )}

              {showComment && (
                <div
                  className="commentMapDiv"
                  onClick={() => {
                    dispatch(setVisibleRightSideBar(true));
                    setShowMap(true);
                    setShowComment(false);
                    setShowSideBar(false);
                  }}
                >
                  <FaRegMap className="commentLine" />
                  Show Map
                </div>
              )}

              <div
                className="visitedDiv"
                onClick={() => {
                  if (isLoggedIn) {
                    // only work when logged in
                    toggleVisitVibeSpot();
                  }
                }}
              >
                {visited && <RiMapPin5Fill className="locationFill" />}
                {!visited && <RiMapPin5Line className="locationLine" />}
                <p
                  style={{ color: "green" }}
                  onClick={() => {
                    dispatch(setVisibleRightSideBar(true));
                    if (showSideBar === false) {
                      setShowSideBar(!showSideBar);
                    }
                    setShowLikedByList(false);
                    setShowVisitedByList(true);
                    setShowComment(false);
                    setShowMap(false);
                  }}
                >
                  Already Visited ({visitedByList?.length})
                </p>
              </div>
            </div>
          </div>
          {/* Info Display Ends Here */}

          {/* Liked & Visited By People List display starts here */}
          {showSideBar && rightSideVisible ? (
            <div className="commentDiv likevisitedbyDiv">
              {showLikedByList && (
                <InfoList
                  listData={likesList}
                  placeholder="Search Liked By"
                  contentHeading="Liked By People : "
                  isLoggedIn={isLoggedIn}
                />
              )}

              {showVisitedByList && (
                <InfoList
                  listData={visitedByList}
                  placeholder="Search Visited By"
                  contentHeading="Visited By People : "
                  isLoggedIn={isLoggedIn}
                />
              )}
            </div>
          ) : (
            <></>
          )}
          {/* Liked & Visited By People List display ends here */}

          {/* Map Container Starts Here */}
          {showMap && rightSideVisible ? (
            <MapContainer
              key={position} // This ensures re-rendering when position changes
              id="map"
              center={position}
              zoom={15}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>Your Current Location</Popup>
              </Marker>
            </MapContainer>
          ) : (
            <></>
          )}
          {/* Map Container Ends Here */}

          {/* Comment Section Start Here */}
          {showComment && rightSideVisible ? (
            <div className="commentDiv">
              {isLoggedIn && (
                <div className="commentInputBox">
                  <img
                    src={
                      userInfo?.userPicturePath !== ""
                        ? userImageUrl + userInfo?.userPicturePath
                        : avatar
                    }
                    alt="Comment Profile Pic"
                    onError={(e) => {
                      e.target.onerror = null; // Prevents looping
                      e.target.src = avatar; // Fallback URL for the image
                    }}
                  />
                  <input
                    value={commentInput}
                    placeholder="Comment here..."
                    onChange={(e) => setCommentInput(e.target.value)}
                  />
                  <button onClick={() => postComment(commentInput)}>
                    <GrSend className="postIcon" />
                  </button>
                </div>
              )}
              {/* Comment Messages starts here */}
              {!isLoggedIn && (
                <div className="logInMessage">
                  <span>
                    <Link to="/auth/sign-in">Sign In</Link>
                  </span>{" "}
                  to post comment.
                </div>
              )}
              {commentError && (
                <div className="logInMessage">
                  <span>Something</span> went wrong.
                </div>
              )}
              {commentSuccess && (
                <div className="logInMessage commentMessage">
                  <span>Comment</span> Posted.
                </div>
              )}
              {/* Comment Messages ends here */}

              <hr />

              {vibespotInfo.comments?.length === 0 && (
                <div className="logInMessage commentMessage">
                  <span>Be First One </span>to post Comment.
                </div>
              )}
              <div className="commentDisplayBox">
                <div className="commentList">
                  {[...vibespotInfo?.comments]
                    .slice(commentStart, commentEnd)
                    .reverse()
                    .map((c, index) => (
                      <div key={index} className="commentBox">
                        <div className="comment">
                          <img
                            src={
                              c.userId?.userPicturePath !== ""
                                ? userImageUrl + c.userId?.userPicturePath
                                : avatar
                            }
                            alt={`${c.userId.firstName} ${c.userId.lastName}`}
                            onError={(e) => {
                              e.target.onerror = null; // Prevents looping
                              e.target.src = avatar; // Fallback URL for the image
                            }}
                          />
                          <div className="userMeta">
                            <h4>{`${c.userId.firstName} ${c.userId.lastName}`}</h4>
                            <p>@{c.userId.username}</p>
                          </div>
                        </div>
                        <div className="userComment">
                          <p>{c.text}</p>
                        </div>
                      </div>
                    ))}
                </div>
                {/* pagination of comments */}
                {vibespotInfo.comments?.length > 6 && (
                  <div className="arrows">
                    {/* <hr /> */}
                    <div className="commentPagination">
                      {commentEnd < vibespotInfo.comments.length && (
                        <div
                          onClick={() => {
                            loadPrevious();
                          }}
                        >
                          <MdOutlineArrowBackIos className="paginationIcon" />
                        </div>
                      )}
                      {commentStart !== 0 && (
                        <div
                          onClick={() => {
                            loadNext();
                          }}
                        >
                          <MdOutlineArrowForwardIos className="paginationIcon" />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <></>
          )}
          {/* Comment Section Ends Here */}
        </div>
      )}
    </div>
    //   </div>
    // </div>
  );
};

export default VibeSpot;
