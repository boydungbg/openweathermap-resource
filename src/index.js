/* eslint-disable no-restricted-globals */
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

var scrollDaily = document.getElementById("forecast-daily-scroll");
var scrollDailyLeft = document.getElementById("scroll-daily-left");
var scrollDailyRight = document.getElementById("scroll-daily-right");

// var limitScroll = (scrollDaily.scrollWidth / screen.width) * (2 / 3);
// var countScrollLeft = 1;
scrollDailyLeft.addEventListener("click", function () {
  scrollDaily.scrollLeft -= screen.width * (2 / 3);
});
scrollDailyRight.addEventListener("click", function () {
  scrollDaily.scrollLeft += screen.width * (2 / 3);
});
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
