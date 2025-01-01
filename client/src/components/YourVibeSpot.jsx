import React from "react";
import { useSelector } from "react-redux";

const YourVibeSpot = () => {
  //function to get the vibespot created by the user
  const user = useSelector((state) => state.auth.currentUser);
  console.log(user);
  const getMyVibeSpot = async (userId) => {
    try {
      //code
    } catch (err) {
      console.log("error_message : ", err.message);
    }
  };
  return <div>YourVibeSpot</div>;
};

export default YourVibeSpot;
