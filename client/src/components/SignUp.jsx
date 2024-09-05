import React, { useState } from "react";
import axios from "axios";
import "../components/styles/GlobalForm.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  serverSignUpUrl,
  serverCheckUserNameAvailabilityUrl,
  serverCheckDuplicateEmailUrl,
} from "../services/apicalls";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { PiCheckFatFill } from "react-icons/pi";
import { GiCancel } from "react-icons/gi";
import { avatar } from "../constants/images";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [serverCode, setServerCode] = useState(0);
  const [validUserName, setValidUserName] = useState(false);
  const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);
  const [togglePassword, SettogglePassword] = useState(true);

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
    try {
      const url = serverCheckUserNameAvailabilityUrl + checkUsername;
      const response = await axios.get(url); // Use axios.get for a GET request
      console.log("Username Available : ", response.data.isAvailable); // Access the data property
      setValidUserName(response.data.isAvailable); // Correctly set the value from response
    } catch (error) {
      console.error("error_message : ", error.message);
      return error;
    }
  };

  // check for email duplication
  const checkEmailDuplicate = async (enteredEmail) => {
    //email duplicate check by sending the email to server and check for uniqueness
    try {
      const url = serverCheckDuplicateEmailUrl + enteredEmail;
      const response = await axios.get(url); //Use axios.get for a GET request
      setIsEmailDuplicate(response.data.isDuplicate);
      console.log("Duplicate : ", response.data.isDuplicate);
      setIsEmailDuplicate(response.data.isDuplicate);
    } catch (error) {
      console.error("error_message : ", error.message);
      return error;
    }
  };

  // submit the user info to create account
  const submitUserInfo = async (data) => {
    //it will pass the user info into the body
    console.log(data);
    try {
      const response = await fetch(serverSignUpUrl, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      });
      // Log the server response code
      console.log("Server Response Code:", response.status);
      setServerCode(response.status);
      const received_response = await response.json();
      console.log(received_response);
    } catch (err) {
      console.log("error_message :", err.message);
    }
  };

  return (
    <div className="formBox">
      <div className="formDiv">
        <div className="formDivMain">
          <h2>
            Sign Up to <span>Locale VibeSpot</span>
            <br />
            and share your vibe with everyone.
          </h2>
          <div className="profileBox">
            <div className="useruploadedpic">
              <img src={avatar} alt="profile pic" />
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
                  {...register("firstName", { required: true })}
                />
              </div>
              <div>
                {errors.lastName && (
                  <p className="error">Last Name required.</p>
                )}
                <input
                  name="lastName"
                  placeholder="Last Name"
                  {...register("lastName", { required: true })}
                />
              </div>
            </div>

            {/* Username Validation Form Starts Here --  */
            /* empty username should not be a username*/}
            <div>
              <div className="usernameBox">
                <input
                  name="username"
                  placeholder="@username"
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
                <div
                  className="checkValidity"
                  onClick={() => checkUsernameAvailability(username)}
                >
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
                  <p style={{ fontWeight: "700" }}>
                    <span>check</span>
                  </p>
                </div>
              </div>
            </div>
            {/* Email Duplication Form Starts Here --  */}
            <div>
              {errors.email && (
                <p className="error">Enter Valid Email Address</p>
              )}
              <input
                name="email"
                placeholder="Enter Email Address"
                type="email"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "EEnter Valid Email Address",
                  },
                  onBlur: (e) => {
                    checkEmailDuplicate(e.target.value);
                  },
                })}
              />
            </div>
            <div>
              {errors.password && (
                <p className="error">
                  Password length must be 8-16 containing both letters and
                  numbers.{" "}
                </p>
              )}
              <div className="passwordBox">
                <input
                  name="password"
                  placeholder="Enter Password"
                  type={togglePassword ? "password" : "text"}
                  {...register("password", {
                    required: true,
                    minLength: 8,
                    maxLength: 16,
                    pattern: {
                      value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]+$/,
                      message: "Password must contain both letters and numbers",
                    },
                  })}
                />
                <div
                  className="togglePassword"
                  onClick={() => SettogglePassword(!togglePassword)}
                >
                  {togglePassword && <IoEyeOutline className="searchIcon" />}
                  {!togglePassword && (
                    <IoEyeOffOutline className="searchIcon" />
                  )}
                </div>
              </div>

              <div className="forgetPasswordBox">
                <p style={{ fontWeight: 700 }}>
                  <span>
                    <Link to="../auth/change-password">Forgot Password?</Link>
                  </span>
                </p>
              </div>
            </div>
            <div
              style={{ textAlign: "center", width: "75%", margin: "0 auto" }}
            >
              <button type="submit">SIGN UP</button>
              <hr />
              <br />
              <p style={{ fontWeight: 700 }}>
                Already have an account?{" "}
                <span>
                  <Link to="../auth/sign-in">Sign In</Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
      {serverCode !== 0 && (
        <div className="messageBox">
          {serverCode === 500 && (
            <div className="message">
              <p style={{ textAlign: "center" }}>
                <span>
                  {!validUserName && "Username "}
                  {!validUserName && isEmailDuplicate ? " and " : <></>}
                  {isEmailDuplicate && "Email Address "}
                </span>
                Already Exists!!!
              </p>
              <button onClick={() => setServerCode(0)}>Try Again</button>
            </div>
          )}

          {serverCode === 201 && (
            <div className="message">
              <p>
                <span>Account</span> Created Successfully!!!
              </p>
              <Link to="../auth/sign-in">
                <button>Sign In Now</button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SignUp;
