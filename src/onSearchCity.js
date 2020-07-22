/* eslint-disable no-this-before-super */
/* eslint-disable react/react-in-jsx-scope */
import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ListCities from "./renderCities";
import getDataCity from "./sevices/getDataCity";
import getDataWeather from "./sevices/getDataWeather";

class onSearchCity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "",
      citiesFilter: [],
    };
    this.handlerOnSearchCity = this.handlerOnSearchCity.bind(this);
    this.handlerOnclick = this.handlerOnclick.bind(this);
    this.setStates = this.setStates.bind(this);
    this.timer = null;
  }

  setStates(obj) {
    this.setState(obj);
  }

  handlerOnSearchCity(e) {
    this.setState({ cityName: e.target.value });
    clearTimeout(this.timer);
    this.timer = setTimeout(async () => {
      let data = [];
      if (this.state.cityName) {
        data = await getDataCity(this.state.cityName);
      }
      this.setState({
        citiesFilter: data.cities ? data.cities.splice(0, 10) : [],
      });
    }, 400);
  }
  async handlerOnclick(e) {
    e.preventDefault();
    let weatheres = await getDataWeather(this.state.cityName);
    this.setState({
      cityName: "",
      citiesFilter: [],
    });
    this.props.setStates({ weatheres });
  }

  render() {
    let cityName = this.state.cityName;
    console.log(this.state.citiesFilter);
    return (
      <ul className="header">
        <li>
          <div>
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
          </div>
          <ListCities
            cities={this.state.citiesFilter}
            setWeatheres={this.props.setStates}
            setStates={this.setStates}
          />
        </li>
      </ul>
    );
  }
}

export default onSearchCity;
