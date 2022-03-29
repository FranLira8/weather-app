//challenge 1:
let now = new Date();

let h6 = document.querySelector("h6");

let date = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();
let days = [
  "Sun",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

h6.innerHTML = `${day} ${month} ${date} ${year}, ${hour}:${minutes}`;

//challenge 2:

//challenge 3:
function changeToCelsius() {
  let temp = document.querySelector("#currentTemp");
  temp.innerHTML = "☀️ 18";
}

function changeToFahrenheit() {
  let temp = document.querySelector("#currentTemp");
  temp.innerHTML = "☀️ 64";
}

let celsius = document.querySelector("#celsius");
let fahrenheit = document.querySelector("#fahrenheit");

celsius.addEventListener("click", changeToCelsius);
fahrenheit.addEventListener("click", changeToFahrenheit);

//homework week 5
let currentCity = document.querySelector("#city");

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#currentTemp");
  temperatureElement.innerHTML = `${temperature}°C🌦️`;
  console.log(response);
  let minTemp = Math.round(response.data.main.temp_min);
  let minTempEl = document.querySelector("#minTemp");

  minTempEl.innerHTML = `Min ${minTemp}°C`;

  let maxTemp = Math.round(response.data.main.temp_max);
  let maxTempEl = document.querySelector("#maxTemp");

  maxTempEl.innerHTML = `Max ${maxTemp}°C`;
  let currentCityName = response.data.name;

  currentCity.innerHTML = currentCityName;
}

function displayCity(event) {
  let apiKey = "047a16ee4ff9c5f736393bccc1c2faad";
  let city = document.querySelector("#searchBox").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

  event.preventDefault();
  let searchBox = document.querySelector("#searchBox");

  currentCity.innerHTML = searchBox.value;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
let form = document.querySelector("#form");
form.addEventListener("submit", displayCity);

//bonus homework week 5:

function searchLocation(position) {
  let latitud = position.coords.latitude;
  let longitud = position.coords.longitude;
  let units = "metric";
  let apiKey = "047a16ee4ff9c5f736393bccc1c2faad";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);
