// retrieving current time info
function formatDate(timestamp) {
    let date = new Date(timestamp);

    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }

    let mins = date.getMinutes();
    if (mins < 10) {
        mins = `0${mins}`;
    }

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = date.getDay();
    return `${days[day]} ${hours}:${mins}`
}

// search for a temperature in specific city
function showWeather(response) {
    let tempElement = document.querySelector("#current-temp");
    let cityElement = document.querySelector("#city");
    let cloudinessElement = document.querySelector("#cloudiness");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#current-time");
    let weatherElement = document.querySelector("#weather-description");
    let iconElement = document.querySelector("#weather-icon");

    tempElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
    cloudinessElement.innerHTML = `${response.data.clouds.all}%`;
    humidityElement.innerHTML = `${response.data.main.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
    timeElement.innerHTML = formatDate(response.data.dt * 1000);
    weatherElement.innerHTML = response.data.weather[0].description;
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
}

// indicate to user that the city can't be found
function alertWrongCity() {
    let searchInput = document.querySelector("#search-input");
    searchInput.classList.add("is-invalid");
    let invalidCityElement = document.querySelector(".invalid-city");
    invalidCityElement.classList.remove("invisible");
}

function clearAlert() {
    let searchInput = document.querySelector("#search-input");
    searchInput.classList.remove("is-invalid");
    let invalidCityElement = document.querySelector(".invalid-city");
    invalidCityElement.classList.add("invisible");
}

// make an api call to search for a city
function searchCity(city) {
    if (city) {
        axios.get(`${apiUrl}q=${city}&units=metric&appid=${apiKey}`).
            then(showWeather).catch(alertWrongCity);
    } else {
        alert("Please write the name of the city...");
    }
}

// make an api call to search for a city
function handleSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
    searchCity(searchInput.value);
}

// search for a temperature in current location
function findTemp(position) {
    axios.get(`${apiUrl}lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`).then(showWeather);
}

// convert units of temp to Celsius
function tempCelcius(event) {
    event.preventDefault();
    let currentTempElement = document.querySelector("#current-temp");
    currentTempElement.innerHTML = "17";
}

// convert units of temp to Fahrenheit
function tempFahrenheit(event) {
    event.preventDefault();
    let currentTempElement = document.querySelector("#current-temp");
    currentTempElement.innerHTML = "60";
}

// weather API info
let apiKey = "d0acf7f4fbfe6d9b905827e17faae31d";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";

// search Engine
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
let searchInput = document.querySelector("#search-input");
searchInput.addEventListener("keydown", clearAlert);

// weather at current position
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", () => { navigator.geolocation.getCurrentPosition(findTemp); clearAlert() });

// units conversion
let celsiusButton = document.querySelector("#celsius-temp");
celsiusButton.addEventListener("click", tempCelcius);
let fahrenheitButton = document.querySelector("#fahrenheit-temp");
fahrenheitButton.addEventListener("click", tempFahrenheit);

// upper tab controls
let buchaElement = document.querySelector("#bucha");
buchaElement.addEventListener("click", () => { searchCity("bucha") });
let hostomelElement = document.querySelector("#hostomel");
hostomelElement.addEventListener("click", () => { searchCity("hostomel") });
let kharkivElement = document.querySelector("#kharkiv");
kharkivElement.addEventListener("click", () => { searchCity("kharkiv") });
let mariupolElement = document.querySelector("#mariupol");
mariupolElement.addEventListener("click", () => { searchCity("mariupol") });