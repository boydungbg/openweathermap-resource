/* eslint-disable react/react-in-jsx-scope */
import React, { Component } from "react";
import getDataWeather from "./sevices/getDataWeather";

class renderCity extends Component {
  async onClickCitiSearch(city) {
    if (city) {
      let weatheres = await getDataWeather(city);
      this.props.setWeatheres({ weatheres });
      this.props.setStates({
        citiesFilter: [],
        cityName: "",
      });
    }
  }

  render() {
    let cities = this.props.cities;
    return (
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
    );
  }
}

export default renderCity;
