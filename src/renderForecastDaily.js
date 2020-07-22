/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/react-in-jsx-scope */
import React, { Component } from "react";

class renderForecastDaily extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: [true],
    };
    this.day = ["Sun", "Mon", "Tue", "Web", "Thu", "Fri", "Sat"];
  }
  handlerOnclickActiveDay(dt, index) {
    var active = this.props.weatheres.list.map((daily) => {
      if (dt === daily.dt) return true;
      else return false;
    });
    this.setState({
      active: active,
    });
    this.props.setStates({ currentWeather: index });
  }

  render() {
    let weatheres = this.props.weatheres;
    let active = this.state.active;
    return (
      <div className="forecast-daily" id="forecast-daily-scroll">
        {weatheres
          ? weatheres.list.map((daily, index) => (
              <div
                className={
                  "forecast-daily-day " + (active[index] ? "active-day" : "")
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
    );
  }
}

export default renderForecastDaily;
