export default (cityname) => {
  return fetch(`http://localhost:8080/city/search?q=${cityname}`).then((data) =>
    data.json()
  );
};
