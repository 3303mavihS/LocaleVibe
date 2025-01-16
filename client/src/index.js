import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import MobileApp from "./MobileApp";

// console.log(window.innerHeight, window.innerWidth);
const root = ReactDOM.createRoot(document.getElementById("root"));
window.innerWidth > 480 ? root.render(<App />) : root.render(<MobileApp />);
