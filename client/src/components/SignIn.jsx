import React, { useState } from "react";
import "../components/styles/GlobalForm.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  setCurrentUser,
  setLoginSession,
  setSessionToken,
} from "../features/loginReducer";
import { avatar } from "../constants/images";
import { useNavigate } from "react-router-dom";
import { serverSignInUrl } from "../services/apicalls";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getPrevUser = localStorage.getItem("CurrentUser") || "";
  const [togglePassword, SettogglePassword] = useState(true);
  const [serverCode, setServerCode] = useState(0);

  // function and variable from useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginSubmit = async (data) => {
    console.log(data);
    //it will pass the user info into the body
    try {
      const response = await fetch(serverSignInUrl, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const received_response = await response.json();
      //console.log(received_response);
      setServerCode(response.status);
      //console.log(response.status);

      if (response.status === 200) {
        dispatch(setCurrentUser(received_response.user));
        dispatch(setLoginSession(true));
        dispatch(setSessionToken(received_response.token));
        localStorage.setItem("LoggedIn", true);
        localStorage.setItem("Token", received_response.token);
        localStorage.setItem("UserId", received_response.user._id);
        sessionStorage.setItem(
          "SessionInfo",
          JSON.stringify(received_response.user)
        );
        navigate("/");
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
            {getPrevUser === "" ? (
              <>
                Sign In to Your Favourite <br />
                <span>Locale VibeSpot</span>
              </>
            ) : (
              <>
                Welcome <span>{getPrevUser}!!!</span> <br />
                Sign In to continue your experience.
              </>
            )}
          </h2>

          <div className="profileBox">
            <div className="useruploadedpic">
              <img src={avatar} alt="profile pic" />
            </div>
          </div>
          <form onSubmit={handleSubmit(loginSubmit)}>
            <div style={{ marginTop: "20px" }}>
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
                    message: "Entered value does not match email format",
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
              <button type="submit">SIGN IN</button>
              <hr />
              <br />
              <p style={{ fontWeight: 700 }}>
                Don't have an Account?{" "}
                <span>
                  <Link to="../auth/sign-up">Create An Account.</Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
      {serverCode === 400 && (
        <div className="messageBox">
          <div className="message">
            <p style={{ textAlign: "center" }}>
              Incorrect
              <span> Username or Password</span>
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => setServerCode(0)}>Try Again</button>
              <Link to="../auth/sign-up">
                <button>Sign Up</button>
              </Link>
            </div>
          </div>
          )
        </div>
      )}
    </div>
  );
};

export default SignIn;
