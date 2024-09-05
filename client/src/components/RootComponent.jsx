import React, { useEffect, useState } from "react";
import Header from "./Header";
import Dashboard from "./Dashboard";
import { serverGetUserDataUrl } from "../services/apicalls";
import { useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import {
  setCurrentUser,
  setLoginSession,
  setSessionToken,
} from "../features/loginReducer";

const RootComponent = () => {
  const dispatch = useDispatch();

  const getUserInfo = async (userId, userToken) => {
    try {
      const url = serverGetUserDataUrl + userId;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });

      const data = await response.json();
      sessionStorage.setItem("SessionInfo", JSON.stringify(data));
      dispatch(setCurrentUser(data));
    } catch (error) {
      console.error("error_message : ", error.message);
    }
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem("LoggedIn") === "true";

    if (loggedIn) {
      const token = localStorage.getItem("Token");
      const userId = localStorage.getItem("UserId");

      if (token && userId) {
        getUserInfo(userId, token);
        dispatch(setSessionToken(token));
        dispatch(setLoginSession(true));
      } else {
        dispatch(setSessionToken(""));
        dispatch(setLoginSession(false));
      }
    } else {
      dispatch(setSessionToken(""));
      dispatch(setLoginSession(false));
    }
  }, [dispatch]); // Add dispatch to the dependency array for safety

  return (
    <BrowserRouter>
      <Header />
      <Dashboard />
    </BrowserRouter>
  );
};

export default RootComponent;
