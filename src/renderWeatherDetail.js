/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/react-in-jsx-scope */
import React, { Component } from "react";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { css } from "emotion";

class renderWeatherDetail extends Component {
  render() {
    let weatheres = this.props.weather.weatheres;
    let currentWeather = this.props.weather.currentWeather;
    return (
      <div>
        {" "}
        <div className="city-name">
          {weatheres ? weatheres.city.name + ", " + weatheres.city.country : ""}
        </div>
        <div className="weather-content">
          <div className="weather-icon">
            <img
              src={
                weatheres
                  ? "https://openweathermap.org/img/wn/" +
                    weatheres.list[currentWeather].weather[0].icon +
                    "@2x.png"
                  : ""
              }
            />
          </div>
          <div className="temp">
            {weatheres
              ? new Date(weatheres.list[currentWeather].sunset * 1000) >
                new Date()
                ? Math.round(weatheres.list[currentWeather].temp.morn)
                : Math.round(weatheres.list[currentWeather].temp.night)
              : ""}
            °
          </div>
          <div className="type-temp">
            <div className="active">C</div>
            <div className="in-active">F</div>
          </div>
        </div>
        <div className="weather-description">
          {weatheres
            ? weatheres.list[currentWeather].weather[0].description
            : ""}
        </div>
        <div className="time-updated">
          Updated as of
          {" " +
            new Date(Date.now()).toLocaleTimeString("vn-VN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
        </div>
        <div className="weather-detail-1">
          <div className="content">
            <div className="content-title">Feels Like</div>
            <div className="content-value">
              {weatheres
                ? Math.round(weatheres.list[currentWeather].feels_like.day)
                : ""}
              °
            </div>
          </div>
          <div className="content">
            <div className="content-title">Wind</div>
            <div className="content-value">
              <FontAwesomeIcon
                className={
                  weatheres
                    ? css`
                        -webkit-transform: rotate(
                          ${weatheres.list[currentWeather].deg}deg
                        );
                        -moz-transform: rotate(
                          ${weatheres.list[currentWeather].deg}deg
                        );
                        -ms-transform: rotate(
                          ${weatheres.list[currentWeather].deg}deg
                        );
                        -o-transform: rotate(
                          ${weatheres.list[currentWeather].deg}deg
                        );
                        transform: rotate(
                          ${weatheres.list[currentWeather].deg}deg
                        );
                      `
                    : ""
                }
                icon={faLocationArrow}
              />
              {weatheres
                ? "   " +
                  Math.round(weatheres.list[currentWeather].speed * 3.6) +
                  "km/h"
                : ""}
            </div>
          </div>
        </div>
        <div className="weather-detail-1">
          <div className="content">
            <div className="content-title">Barometer</div>
            <div className="content-value">
              {weatheres
                ? Math.round(weatheres.list[currentWeather].pressure)
                : ""}
              mb
            </div>
          </div>
          <div className="content">
            <div className="content-title">Humidity</div>
            <div className="content-value">
              {weatheres
                ? "  " + Math.round(weatheres.list[currentWeather].humidity)
                : ""}
              %
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default renderWeatherDetail;
