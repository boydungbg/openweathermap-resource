import React, { Component } from "react";
import "./App.css";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router-dom";
import { css } from "emotion";
import OnSearchCity from "./onSearchCity";
import CurrentWeather from "./renderWeatherDetail";
import ForecastDaily from "./renderForecastDaily";
import BackgroundOnChange from "./backgoundOnchange";
import getDataWeather from "./sevices/getDataWeather";

class App extends Component {
  constructor() {
    super();
    this.state = {
      weatheres: "",
      currentWeather: 0,
    };
    this.setStates = this.setStates.bind(this);
  }

  async componentDidMount() {
    let weatheres = await getDataWeather();
    this.setState({ weatheres: weatheres });
  }

  setStates(obj) {
    this.setState(obj);
  }

  render() {
    const weatheres = this.state.weatheres;
    const currentWeather = this.state.currentWeather;
    let background = BackgroundOnChange(weatheres, currentWeather);
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
          <OnSearchCity setStates={this.setStates} />
          <div className="main">
            <CurrentWeather
              weather={{
                weatheres: weatheres,
                currentWeather: currentWeather,
              }}
            />
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
                <ForecastDaily
                  weatheres={this.state.weatheres}
                  setStates={this.setStates}
                />
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
