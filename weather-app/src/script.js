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
  let apiKey = "047a16ee4ff9c5f736393bccc1c2faad";
  let city = document.querySelector("#city").textContent;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  celsius.classList.add("selected");
  fahrenheit.classList.remove("selected");

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let celsius = document.querySelector("#celsius");
let fahrenheit = document.querySelector("#fahrenheit");

function changeToFahrenheit() {
  // let temp = document.querySelector("#currentTemp");
  let apiKey = "047a16ee4ff9c5f736393bccc1c2faad";
  let city = document.querySelector("#city").textContent;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial`;
  fahrenheit.classList.add("selected");
  celsius.classList.remove("selected");

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

celsius.addEventListener("click", changeToCelsius);
fahrenheit.addEventListener("click", changeToFahrenheit);

//homework week 5

let currentCity = document.querySelector("#city");

function showTemperature(response) {
  console.log(response);
  let icon = document.getElementById("icon");
  let unitRes = GiveselectedUnit();
  let displayUnit;
  if (unitRes === "imperial") {
    displayUnit = "°F";
  } else {
    displayUnit = "°C";
  }
  let iconId = response.data.weather[0].icon;
  let iconUrl = `http://openweathermap.org/img/wn/${iconId}@2x.png`;
  console.log(iconId);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#currentTemp");
  temperatureElement.textContent = `${temperature}${displayUnit}`;
  let minTemp = Math.round(response.data.main.temp_min);
  let minTempEl = document.querySelector("#minTemp");
  icon.setAttribute("src", iconUrl);

  minTempEl.innerHTML = `Min ${minTemp}${displayUnit}`;

  let maxTemp = Math.round(response.data.main.temp_max);
  let maxTempEl = document.querySelector("#maxTemp");

  maxTempEl.innerHTML = `Max ${maxTemp}${displayUnit}`;
  let currentCityName = response.data.name;

  currentCity.innerHTML = currentCityName;
}

function GiveselectedUnit() {
  let unitEl = document.querySelectorAll(".un");
  if (unitEl[0].className.includes("selected")) {
    return "metric";
  } else {
    return "imperial";
  }
}

function displayCity(event) {
  let apiKey = "047a16ee4ff9c5f736393bccc1c2faad";
  let city = document.querySelector("#searchBox").value;
  let selectedUnit = GiveselectedUnit();
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${selectedUnit}`;

  // console.log(unitEl[0].className);
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
  let unitEl = document.querySelectorAll(".un");
  let selectedUnit = GiveselectedUnit();

  let apiKey = "047a16ee4ff9c5f736393bccc1c2faad";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${apiKey}&units=${selectedUnit}`;
  console.log(apiUrl);
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);
