/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import "./App.css";
import {
  faSearch,
  faLocationArrow,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { css } from "emotion";

class App extends Component {
  constructor() {
    super();
    this.state = {
      cityName: "",
      currentWeather: 0,
      weatheres: "",
      cities: "",
      citiesFilter: "",
      active: [true],
    };
    console.log(this.props);
    this.day = ["Sun", "Mon", "Tue", "Web", "Thu", "Fri", "Sat"];
    this.handlerOnclick = this.handlerOnclick.bind(this);
    this.getData = function (cityName = "hanoi") {
      return axios({
        method: "GET",
        url: "https://community-open-weather-map.p.rapidapi.com/forecast/daily",
        headers: {
          "content-type": "application/octet-stream",
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
          "x-rapidapi-key":
            "f54618c2bdmsh888d0abb30a786ep1c1462jsnd40ae44285b3",
          useQueryString: true,
        },
        params: {
          q: cityName,
          cnt: "16",
          units: "metric",
        },
      });
    };
    this.handlerOnSearchCity = this.handlerOnSearchCity.bind(this);
  }

  async componentDidMount() {
    let data = await Promise.all([
      fetch(this.props.location.pathname + "city.list.min.json").then((data) =>
        data.json()
      ),
      this.getData().then((res) => res.data),
    ]).then((res) => res);
    this.setState({
      cities: data[0],
      weatheres: data[1],
    });
  }

  async handlerOnclick(e) {
    e.preventDefault();
    let weatheres = await this.getData(this.state.cityName)
      .then((res) => res.data)
      .catch((err) => console.log(err));
    this.setState({
      cityName: "",
      weatheres: weatheres,
      citiesFilter: [],
    });
  }

  handlerOnclickActiveDay(dt, index) {
    var active = this.state.weatheres.list.map((daily) => {
      if (dt === daily.dt) return true;
      else return false;
    });
    this.setState({
      active: active,
      currentWeather: index,
    });
  }

  handlerOnSearchCity(e) {
    var cities = [];
    if (e.target.value) {
      let stringReg = `^${e.target.value.toLowerCase()}`;
      const regex = new RegExp(stringReg);
      cities = this.state.cities.filter(({ name, country }) => {
        return (name + "," + country).toLowerCase().match(regex);
      });
    }
    this.setState({
      citiesFilter: cities.splice(0, 10),
      cityName: e.target.value,
    });
  }
  async onClickCitiSearch(city) {
    if (city) {
      let weatheres = await this.getData(city)
        .then((res) => res.data)
        .catch((err) => console.log(err));
      this.setState({
        cityName: "",
        weatheres: weatheres,
        citiesFilter: [],
      });
    }
  }

  render() {
    const cityName = this.state.cityName;
    const weatheres = this.state.weatheres;
    const cities = this.state.citiesFilter;
    const currentWeather = this.state.currentWeather;
    const active = this.state.active;
    console.log(weatheres);
    let background = "";
    if (weatheres) {
      switch (weatheres.list[currentWeather].weather[0].main) {
        case "Clouds":
          if (
            weatheres.list[currentWeather].weather[0].description ===
              "few clouds" ||
            weatheres.list[currentWeather].weather[0].description ===
              "broken clouds" ||
            weatheres.list[currentWeather].weather[0].description ===
              "scattered clouds"
          ) {
            background = "fewClouds.jpeg";
          } else {
            background = "cloud.jpeg";
          }
          break;
        case "Rain":
          if (
            weatheres.list[currentWeather].weather[0].description ===
            "light rain"
          ) {
            background = "lightRain.jpg";
          } else {
            background = "ModerateRain.jpg";
          }
          break;
        case "Clear":
          if (weatheres.list[currentWeather].sunset * 1000 > Date.now()) {
            background = "skyclear.jpg";
          } else {
            background = "skynight.jpg";
          }
          break;
        default:
          break;
      }
    }
    return (
      <div
        className={css`
          text-align: center;
          height: 100%;
          background-image: url("${this.props.location.pathname}Image/${background}");
          background-position: left;
          background-repeat: no-repeat;
          background-size: cover;
        `}
      >
        <div className="bg-sunny-background">
          <ul className="header">
            <li>
              <form>
                <input
                  placeholder="Search"
                  type="search"
                  value={cityName}
                  onChange={this.handlerOnSearchCity}
                />
                <button onClick={this.handlerOnclick}>
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </form>
              <ul className="list-city">
                {cities
                  ? cities.map((city, index) => (
                      <li
                        key={index}
                        onClick={() =>
                          this.onClickCitiSearch(city.name + "," + city.country)
                        }
                      >
                        {city.name + "," + city.country}
                      </li>
                    ))
                  : ""}
              </ul>
            </li>
          </ul>
          <div className="main">
            <div className="city-name">
              {weatheres
                ? weatheres.city.name + ", " + weatheres.city.country
                : ""}
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
                  <FontAwesomeIcon icon={faLocationArrow} />
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
            <div className="daily">
              <div className="title left">Daily</div>
              <div className="forecast">
                <div className="icon-scroll">
                  <FontAwesomeIcon
                    className="icon-daily-left"
                    icon={faChevronLeft}
                    id="scroll-daily-left"
                  />
                </div>
                <div className="forecast-daily" id="forecast-daily-scroll">
                  {weatheres
                    ? weatheres.list.map((daily, index) => (
                        <div
                          className={
                            "forecast-daily-day " +
                            (active[index] ? "active-day" : "")
                          }
                          key={index}
                          onClick={(e) => {
                            this.handlerOnclickActiveDay(daily.dt, index);
                          }}
                        >
                          <div className="content-daily-day">
                            {this.day[new Date(daily.dt * 1000).getDay()] +
                              " " +
                              new Date(daily.dt * 1000).getDate()}
                          </div>
                          <img
                            className={
                              daily.weather[0].main !== "Clouds"
                                ? "content-daily-icon-1"
                                : "content-daily-icon-2"
                            }
                            src={
                              "https://openweathermap.org/img/wn/" +
                              daily.weather[0].icon +
                              ".png"
                            }
                          />
                          <div className="content-daily-temp">
                            <div className="daily-temp-max">
                              {Math.round(daily.temp.max)}°
                            </div>
                            <div className="daily-temp-min">
                              {Math.round(daily.temp.min)}°
                            </div>
                          </div>
                          <div className="daily-weather-des">
                            {daily.weather[0].description}
                          </div>
                        </div>
                      ))
                    : ""}
                </div>
                <div className="icon-scroll">
                  <FontAwesomeIcon
                    className="icon-daily-right"
                    id="scroll-daily-right"
                    icon={faChevronRight}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
