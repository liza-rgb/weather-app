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

    celciusTemp = response.data.main.temp;

    tempElement.innerHTML = Math.round(celciusTemp);
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
function showTempCelcius(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let currentTempElement = document.querySelector("#current-temp");
    currentTempElement.innerHTML = Math.round(celciusTemp);
}

// convert units of temp form Celcius to Fahrenheit
function showTempFahrenheit(event) {
    event.preventDefault();
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let currentTempElement = document.querySelector("#current-temp");
    let fahrenheit = (celciusTemp * 9) / 5 + 32;
    currentTempElement.innerHTML = Math.round(fahrenheit);
}

// weather API info
let apiKey = "d0acf7f4fbfe6d9b905827e17faae31d";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";

// weather at current position
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", () => { navigator.geolocation.getCurrentPosition(findTemp); clearAlert() });

// units conversion
let celciusTemp = null;
let celsiusLink = document.querySelector("#celsius-temp");
celsiusLink.addEventListener("click", showTempCelcius);
let fahrenheitLink = document.querySelector("#fahrenheit-temp");
fahrenheitLink.addEventListener("click", showTempFahrenheit);

// upper tab controls
let kyivElement = document.querySelector("#kyiv");
kyivElement.addEventListener("click", () => { searchCity("kyiv") });
let buchaElement = document.querySelector("#bucha");
buchaElement.addEventListener("click", () => { searchCity("bucha") });
let hostomelElement = document.querySelector("#hostomel");
hostomelElement.addEventListener("click", () => { searchCity("hostomel") });
let kharkivElement = document.querySelector("#kharkiv");
kharkivElement.addEventListener("click", () => { searchCity("kharkiv") });
let mariupolElement = document.querySelector("#mariupol");
mariupolElement.addEventListener("click", () => { searchCity("mariupol") });

// search Engine
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
let searchInput = document.querySelector("#search-input");
searchInput.addEventListener("keydown", clearAlert);