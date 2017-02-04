// This file is just for testing. Luca/application will consume the App via the library exported.
import React from "react";
import ReactDOM from "react-dom";
import {App, className} from "./App";

const element = document.getElementById("app");
element.className = className;
const handleSuccessfulAuthentication = () => {
  return <div>success!</div>;
};
ReactDOM.render(
  <App handleSuccessfulAuthentication={handleSuccessfulAuthentication}/>, element);
