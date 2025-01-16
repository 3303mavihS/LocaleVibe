import React, { useEffect } from "react";
import { useState, useRef } from "react";
import {
  phpVibesotUploadServerLink,
  serverVibeSpotImageUploadUrl,
} from "../services/apicalls";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { serverAddVibeSpotUrl } from "../services/apicalls";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { ImUpload } from "react-icons/im";
import { TbCurrentLocation } from "react-icons/tb";
import { RiFullscreenFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { setVisibleRightSideBar } from "../features/headerElementReducer";
import { compose } from "redux";

const AddVibeSpot = () => {
  const isLocationPicked = useSelector(
    (state) => state.locationInfo.isLocationPicked
  );
  const pickedLocation = useSelector(
    (state) => state.locationInfo.pickedLocation
  );
  const [serverCode, setServerCode] = useState(0);
  const [category, setCategory] = useState("");
  const [lat, setLat] = useState(pickedLocation[0]);
  const [long, setLong] = useState(pickedLocation[1]);
  const userInfo = useSelector((state) => state.auth.currentUser);
  const userToken = useSelector((state) => state.auth.sessionToken);
  const [currentPosition, setCurrentPosition] = useState([0, 0]);

  const dispatch = useDispatch();

  // function and variable from useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //form submission handler
  const submiteVibeSpotInfo = async (formData) => {
    //check for location picked specifically
    if (isLocationPicked) {
      if (imageUploaded) {
        //submitted user data
        const data = { ...formData, lat, long, vibeSpotImagePath, category };
        // console.log(data);
        // passing data in request body
        try {
          const response = await fetch(serverAddVibeSpotUrl, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${userToken}`,
            }, // Pass token in Bearer Authorization header },
            body: JSON.stringify(data),
          });
          // Log the server response code
          // console.log("Server Response Code:", response.status);
          setServerCode(response.status);
          // Check for successful response
          if (!response.ok) {
            throw new Error(`Server Error: ${response.status}`);
          }

          const received_response = await response.json();
          // console.log(received_response);
        } catch (err) {
          // console.log("error_message : ", err.message);
        }
      } else {
        setServerCode(1002);
        // console.log("server code 1002");
      }
    } else {
      setServerCode(1001);
      // console.log("server code 1001");
    }
  };

  //handles this category selection process
  const handleClick = (value) => {
    setCategory(value);
  };

  //handle the image uploading process
  const [openModal, setOpenModal] = useState(false);
  const fileUploadRef = useRef(null);
  const maxImages = 4;
  const minImages = 1;

  const handleImageUpload = (event) => {
    event.preventDefault();
    fileUploadRef.current.click();
  };

  const openModalBox = () => {
    setOpenModal(true);
  };

  const [chosenImages, setChosenImages] = useState([]);
  const [vibeSpotImagePath, setVibeSpotImagePath] = useState([]);
  const [imageSelected, setImageSelected] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);

  const uploadImageForDisplay = () => {
    const files = fileUploadRef.current.files; // This is a FileList
    const fileArray = Array.from(files); // Convert FileList to Array

    // Check if number of selected images meets the criteria
    if (fileArray.length < minImages) {
      alert(`Please select at least ${minImages} image(s).`);
      return;
    }

    if (fileArray.length > maxImages) {
      alert(`You can only select up to ${maxImages} images.`);
      return;
    }

    // Create array of image URLs
    const imageUrls = fileArray.map((file) => URL.createObjectURL(file));

    // Set image URLs in state
    setChosenImages(imageUrls);
    setImageSelected(true);
    // console.log(imageUrls);
  };

  const uploadSelectedImage = async () => {
    try {
      const files = fileUploadRef.current.files;

      const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
        formData.append("vibespot-image[]", files[i]);
      }

      const response = await fetch(phpVibesotUploadServerLink, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setVibeSpotImagePath(data.imagePaths);
        setImageUploaded(true);
      } else {
        console.error("Upload failed:", response.status);
      }
    } catch (err) {
      console.error("Upload error:", err.message);
    }
  };

  //useEffect to synchronize the ui according to data loading

  useEffect(() => {
    /**
     * Call the function in useEffect show the updated data
     */
    setCurrentPosition([pickedLocation[0], pickedLocation[1]]);
    setLat(pickedLocation[0]);
    setLong(pickedLocation[1]);
    dispatch(setVisibleRightSideBar(true));
  }, []);

  return (
    <div className="formBox">
      <div className="formDiv vibeForm">
        <div className="formDivMain">
          <form onSubmit={handleSubmit(submiteVibeSpotInfo)}>
            <div className="mainBox">
              <div className="inputBox">
                <h2
                  style={{
                    textAlign: "left",
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <HiOutlineViewGridAdd className="headingIcon" />
                  Add New &nbsp;<span>Locale VibeSpot</span>
                </h2>
                <div className="uploadImageBox">
                  <div className="uploadImageBoxMain" onClick={openModalBox}>
                    <p style={{ fontWeight: "700", textAlign: "center" }}>
                      {imageUploaded && (
                        <>
                          <span>VibeSpot Images</span> Uploaded Successfully.
                        </>
                      )}
                      {!imageUploaded && (
                        <>
                          <span>Upload</span> VibeSpot Images Here.
                        </>
                      )}
                    </p>
                  </div>
                </div>
                {/* title input */}
                <div>
                  {errors.title && <p className="error">Title required.</p>}
                  <input
                    name="title"
                    placeholder="VibeSpot Title"
                    {...register("title", { required: true })}
                  />
                </div>
                {/* description input */}
                <div>
                  {errors.description && (
                    <p className="error">Description required.</p>
                  )}
                  <textarea
                    name="description"
                    placeholder="About VibeSpot in 5-6 lines."
                    rows="5"
                    {...register("description", { required: true })}
                  />
                </div>
                {/* category option */}
                <div>
                  <div className="formRadioBox">
                    <p className="error">Choose what type of place it is :</p>
                    <div className="formRadioOptions">
                      <div
                        className={`radioOption ${
                          category === "Bakery" ? "active" : ""
                        }`}
                        onClick={() => handleClick("Bakery")}
                      >
                        Bakery
                      </div>
                      <div
                        className={`radioOption ${
                          category === "Cafe" ? "active" : ""
                        }`}
                        onClick={() => handleClick("Cafe")}
                      >
                        Cafe
                      </div>
                      <div
                        className={`radioOption ${
                          category === "Diner" ? "active" : ""
                        }`}
                        onClick={() => handleClick("Diner")}
                      >
                        Diner
                      </div>
                      <div
                        className={`radioOption ${
                          category === "Food Court" ? "active" : ""
                        }`}
                        onClick={() => handleClick("Food Court")}
                      >
                        Food Court
                      </div>
                      <div
                        className={`radioOption ${
                          category === "Hangout Place" ? "active" : ""
                        }`}
                        onClick={() => handleClick("Hangout Place")}
                      >
                        Hangout Place
                      </div>
                      <div
                        className={`radioOption ${
                          category === "Meetup Point" ? "active" : ""
                        }`}
                        onClick={() => handleClick("Meetup Point")}
                      >
                        MeetUp Point
                      </div>
                      <div
                        className={`radioOption ${
                          category === "Night Club" ? "active" : ""
                        }`}
                        onClick={() => handleClick("Night Club")}
                      >
                        Night Club
                      </div>
                      <div
                        className={`radioOption ${
                          category === "Park" ? "active" : ""
                        }`}
                        onClick={() => handleClick("Park")}
                      >
                        Park
                      </div>
                      <div
                        className={`radioOption ${
                          category === "Restaurant" ? "active" : ""
                        }`}
                        onClick={() => handleClick("Restaurant")}
                      >
                        Restaurant
                      </div>
                    </div>
                  </div>
                </div>
                {/* hidden user id input */}
                <div>
                  <input
                    type="hidden"
                    name="userid"
                    placeholder="userId"
                    value={userInfo?._id || "developer"}
                    {...register("userId", { required: true })}
                  />
                </div>
                {/* best menu input */}
                <div>
                  {errors.best_menu && (
                    <p className="error">Provide some info</p>
                  )}
                  <input
                    name="best_menu"
                    placeholder="Best Menu (Pizza, Vada Pav...)"
                    {...register("best_menu", { required: true })}
                  />
                </div>
                {/* recommendation input (optional) */}
                <div>
                  <textarea
                    name="recommendation"
                    placeholder="Any Recommendation..."
                    rows="3"
                    {...register("recommendation")}
                  />
                </div>
                {/* Rating */}
                <div>
                  {errors.rating && (
                    <p className="error">This field is required.</p>
                  )}
                  <input
                    name="rating"
                    placeholder="rating"
                    {...register("rating", {
                      required: true,
                      min: 0,
                      max: 5,
                    })}
                  />
                </div>
              </div>
              {/* Visualizing Location On Map */}
              <div className="locationBtns">
                <div className="refresh">
                  {!isLocationPicked
                    ? "Location Not Picked"
                    : "Location Captured"}
                </div>
                {/* TODO implement full screen feature here instead of location  */}
                {/* <TbCurrentLocation
                  className="pickLocationIcon"
                  onClick={() => {
                    goFullScreen();
                  }}
                /> */}
              </div>
              {/* Map Container starts here */}
              <MapContainer
                key={currentPosition} // This ensures re-rendering when position changes
                id="map"
                center={currentPosition}
                zoom={15}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={currentPosition}>
                  <Popup>Your Current Location</Popup>
                </Marker>
              </MapContainer>
              {/* Map Container Ends Here */}
            </div>
            <div
              style={{
                textAlign: "center",
                width: "75%",
                margin: "0 auto",
              }}
            >
              <button type="submit">ADD NEW</button>
            </div>
          </form>
        </div>
      </div>
      {(serverCode !== 0 || openModal) && (
        <div className="messageBox">
          {serverCode === 1001 && (
            <div className="message">
              <p style={{ textAlign: "center" }}>
                <span>Location Required</span> <br></br>Permission Denied!!!
              </p>
              <button onClick={() => setServerCode(0)}>Try Again</button>
            </div>
          )}
          {serverCode === 1002 && (
            <div className="message">
              <p style={{ textAlign: "center" }}>
                <span>VibeSpot Images</span> Not Uploaded!!!
              </p>
              <button onClick={() => setServerCode(0)}>Try Again</button>
            </div>
          )}
          {serverCode === 201 && (
            <div className="message">
              <p>
                <span>VibeSpot</span> Saved Successfully!!!
              </p>
              <Link to="../dashboard/my-vibespots">
                <button>View All</button>
              </Link>
            </div>
          )}

          {openModal && (
            <div className="modalBox">
              {serverCode === 500 && (
                <p style={{ textAlign: "center" }}>
                  <span>File Size </span> exceed limit!
                </p>
              )}
              {imageSelected && (
                <div className="uploadedImages">
                  <div className="previewBox">
                    {chosenImages.map((image, index) => (
                      <div key={index} className="preview">
                        <img src={image} alt={`Preview ${index}`} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {!imageSelected && (
                <div
                  className="uploadImageBoxMain "
                  onClick={handleImageUpload}
                >
                  <ImUpload className="uploadIcon" />
                  <p style={{ fontWeight: "700", textAlign: "center" }}>
                    <span>Upload</span> VibeSpot Images Here.
                  </p>
                  <p style={{ fontSize: "10px", fontWeight: "700" }}>
                    <span> (*.png /.jpeg)</span>
                  </p>
                </div>
              )}
              {imageSelected && (
                <div className="btnBox">
                  {!imageUploaded ? (
                    <>
                      <div onClick={handleImageUpload}>Change Images</div>
                      <div onClick={uploadSelectedImage}>Upload Images</div>
                    </>
                  ) : (
                    <>
                      <div
                        onClick={() => {
                          setOpenModal(false);
                          setServerCode(0);
                        }}
                      >
                        Uploaded Successfully !!!
                      </div>
                    </>
                  )}
                </div>
              )}
              <input
                type="file"
                id="file"
                ref={fileUploadRef}
                onChange={uploadImageForDisplay}
                hidden
                multiple
                accept="image/png, image/jpeg"
              />
              <button
                style={{ margin: "0 auto" }}
                onClick={() => {
                  setServerCode(0);
                  setOpenModal(false);
                  setChosenImages([]);
                  setImageSelected(false);
                }}
              >
                Close
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddVibeSpot;
