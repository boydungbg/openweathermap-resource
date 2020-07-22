import axios from "axios";
export default (cityname = "hanoi") => {
  return axios({
    method: "GET",
    url: "https://community-open-weather-map.p.rapidapi.com/forecast/daily",
    headers: {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
      "x-rapidapi-key": "f54618c2bdmsh888d0abb30a786ep1c1462jsnd40ae44285b3",
      useQueryString: true,
    },
    params: {
      q: cityname,
      cnt: "16",
      units: "metric",
    },
  }).then((res) => res.data);
};
