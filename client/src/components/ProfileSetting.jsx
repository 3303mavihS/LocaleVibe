import React, { useState, useRef } from "react";
import axios from "axios";
import "../components/styles/GlobalForm.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  serverCheckUserNameAvailabilityUrl,
  serverProfileSettingUrl,
} from "../services/apicalls";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { BiEditAlt } from "react-icons/bi";
import { ImUpload } from "react-icons/im";
import { PiCheckFatFill } from "react-icons/pi";
import { GiCancel } from "react-icons/gi";
import { avatar } from "../constants/images";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../features/loginReducer";
import { serverUserImageUploadUrl, userImageUrl } from "../services/apicalls";

const ProfileSetting = () => {
  const [serverCode, setServerCode] = useState(0);
  const [validUserName, setValidUserName] = useState(false);
  const userInfo = useSelector((state) => state.auth.currentUser);
  const userToken = useSelector((state) => state.auth.sessionToken);
  const dispatch = useDispatch();

  // function and variable from useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // check for valid username
  const checkUsernameAvailability = async (checkUsername) => {
    //Username check availability by sending the username to server
    //where it will be check in the database
    if (username !== "") {
      try {
        const url = serverCheckUserNameAvailabilityUrl + checkUsername;
        const response = await axios.get(url); // Use axios.get for a GET request
        console.log("Username Available : ", response.data.isAvailable); // Access the data property
        setValidUserName(response.data.isAvailable); // Correctly set the value from response
      } catch (error) {
        console.error("error_message : ", error.message);
        return error;
      }
    }
  };

  // submit the user info to create account
  const submitUserInfo = async (data) => {
    //it will pass the user info into the body
    const bodyData = { ...data, userId };
    console.log(bodyData);
    try {
      const url = serverProfileSettingUrl + "/" + userId;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(data),
      });
      // Log the server response code
      console.log("Server Response Code:", response.status);
      setServerCode(response.status);
      const received_response = await response.json();
      console.log(received_response);
      dispatch(setCurrentUser(received_response));
    } catch (err) {
      console.log("error_message :", err.message);
    }
  };

  // state for new data from form
  const [firstName, setFirstName] = useState(userInfo.firstName);
  const [lastName, setLastName] = useState(userInfo.lastName);
  const [username, setUsername] = useState(userInfo.username);
  const [userId, setUserId] = useState(userInfo._id);

  //profile picture change
  const [openModal, setOpenModal] = useState(false);
  const openModalBox = () => {
    setOpenModal(true);
    console.log("modal open");
  };

  const fileUploadRef = useRef(null);
  const [chosenImage, setChosenImage] = useState([]);
  const [vibeSpotImagePath, setVibeSpotImagePath] = useState([]);
  const [imageSelected, setImageSelected] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);

  const handleImageUpload = (event) => {
    event.preventDefault();
    fileUploadRef.current.click();
  };

  const uploadImageForDisplay = () => {
    const file = fileUploadRef.current.files[0]; // This is a FileList

    // Create array of image URLs
    const imageUrl = URL.createObjectURL(file);

    // Set image URLs in state
    setChosenImage(imageUrl);
    setImageSelected(true);
    console.log(imageUrl);
  };

  const uploadAndUpdateProfilePicture = async () => {
    try {
      const file = fileUploadRef.current.files[0]; // This is a FileList

      // Create a new FormData object
      const formData = new FormData();
      formData.append("user-image", file); // Append the file with the correct field name

      const url = serverUserImageUploadUrl + "/" + userId;
      const response = await fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${userToken}` },
        body: formData,
      });
      if (response.status === 200) {
        const data = await response.json();
        setVibeSpotImagePath(data.imagePath);
        setImageUploaded(true);
        console.log(data);
        dispatch(setCurrentUser(data));
      }
    } catch (err) {
      console.log("error_message : ", err.message);
    }
  };

  return (
    <div className="formBox">
      <div className="formDiv">
        <div className="formDivMain">
          <h2>
            Update <span>Your Profile</span>
          </h2>
          <div className="profileBox">
            <div className="useruploadedpic" onClick={openModalBox}>
              <img
                src={
                  userInfo && userInfo.userPicturePath
                    ? userImageUrl + userInfo.userPicturePath
                    : avatar
                }
                alt="profile pic"
              />
              <BiEditAlt className="editProfilePic" />
            </div>
          </div>
          <form onSubmit={handleSubmit(submitUserInfo)}>
            <div className="twoBoxDiv">
              <div>
                {errors.firstName && (
                  <p className="error">First Name required.</p>
                )}
                <input
                  name="firstName"
                  placeholder="First Name"
                  value={firstName}
                  {...register("firstName", {
                    required: true,
                    onChange: (e) => {
                      setFirstName(e.target.value);
                    },
                  })}
                />
              </div>
              <div>
                {errors.lastName && (
                  <p className="error">Last Name required.</p>
                )}
                <input
                  name="lastName"
                  placeholder="Last Name"
                  value={lastName}
                  {...register("lastName", {
                    onChange: (e) => {
                      setLastName(e.target.value);
                    },
                  })}
                />
              </div>
            </div>

            {/* Username Validation Form Starts Here --  */
            /* empty username should not be a username*/}
            <div>
              <div className="usernameBox">
                {username === "" && (
                  <p
                    className="error"
                    style={{ position: "relative", left: "0" }}
                  >
                    change Username
                  </p>
                )}
                <input
                  name="username"
                  placeholder={"@" + userInfo.username}
                  value={username}
                  {...register("username", {
                    required: true,
                    minLength: 5,
                    onChange: (e) => {
                      setUsername(e.target.value);
                      setValidUserName(false);
                    },
                    onBlur: (e) => {
                      checkUsernameAvailability(e.target.value);
                    },
                  })}
                />
                <div className="checkValidity">
                  {username !== "" ? (
                    <>
                      {validUserName ? (
                        <PiCheckFatFill
                          style={{ color: "#570de6" }}
                          className="searchIcon"
                        />
                      ) : (
                        <GiCancel
                          style={{ color: "#570de6" }}
                          className="searchIcon"
                        />
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                  <p
                    style={{ fontWeight: "700" }}
                    onClick={() => checkUsernameAvailability(username)}
                  >
                    <span>check</span>
                  </p>
                </div>
              </div>
            </div>
            {/* Email Duplication Form Starts Here --  */}
            <div>
              <input
                placeholder={userInfo.email}
                value={userInfo.email}
                type="email"
              />
            </div>
            <div
              style={{ textAlign: "center", width: "75%", margin: "0 auto" }}
            >
              <button type="submit">UPDATE</button>
            </div>
          </form>
        </div>
      </div>
      {(serverCode !== 0 || openModal) && (
        <div className="messageBox">
          {serverCode === 200 && (
            <div className="message">
              <p>
                <span>Info</span> Updated Successfully!!!
              </p>
              <button onClick={() => setServerCode(0)}>Continue</button>
            </div>
          )}
          {openModal && (
            <div className="modalBox">
              {imageSelected && (
                <div className="uploadedImages">
                  <div
                    className="previewBox"
                    style={{ justifyContent: "center" }}
                  >
                    <div
                      className="preview"
                      style={{ width: "250px", height: "250px" }}
                    >
                      <img
                        src={chosenImage}
                        alt={`Preview ${chosenImage}`}
                        style={{ borderRadius: "50%" }}
                      />
                    </div>
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
                    <span>Upload</span> Image Here.
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
                      <div onClick={handleImageUpload}>Change</div>
                      <div onClick={uploadAndUpdateProfilePicture}>Upload</div>
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
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileSetting;
