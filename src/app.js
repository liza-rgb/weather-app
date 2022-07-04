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


// API info
let apiKey = "d0acf7f4fbfe6d9b905827e17faae31d";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";


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

function searchCity(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
    if (searchInput.value) {
        axios.get(`${apiUrl}q=${searchInput.value}&units=metric&appid=${apiKey}`).
            then(showWeather).catch(() => { alert("We can't find this city. Please try again!") });
    } else {
        alert("Please write the name of the city...");
    }
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);



// search for a temperature in current location
function findTemp(position) {
    axios.get(`${apiUrl}lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`).then(showWeather);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", () => { navigator.geolocation.getCurrentPosition(findTemp) });

// convert units of temp
function tempCelcius(event) {
    event.preventDefault();
    let currentTemp = document.querySelector("#current-temp");
    currentTemp.innerHTML = "17";
}

function tempFahrenheit(event) {
    event.preventDefault();
    let currentTemp = document.querySelector("#current-temp");
    currentTemp.innerHTML = "60";
}

let buttonCelsius = document.querySelector("#celsius-temp");
buttonCelsius.addEventListener("click", tempCelcius);
let buttonFahrenheit = document.querySelector("#fahrenheit-temp");
buttonFahrenheit.addEventListener("click", tempFahrenheit);