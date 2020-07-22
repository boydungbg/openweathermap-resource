export default (weatheres, currentWeather) => {
  let background = "sunny.jpg";
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
          weatheres.list[currentWeather].weather[0].description === "light rain"
        ) {
          background = "lightRain.jpg";
        } else {
          background = "ModerateRain.jpg";
        }
        break;
      case "Clear":
        if (weatheres.list[currentWeather].sunset * 1000 > Date.now()) {
          background = "sunny.jpg";
        } else {
          background = "skynight.jpg";
        }
        break;
      default:
        break;
    }
  }
  return background;
};
