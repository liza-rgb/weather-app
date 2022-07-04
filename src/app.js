// retrieving current time info
let currentTime = new Date();

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = currentTime.getDay();
let hour = currentTime.getHours();
let min = currentTime.getMinutes();

// displaying current time on tne page
let timeElement = document.querySelector("#current-time");
timeElement.innerHTML = `${days[day]} ${hour}:${min}`;




// API info
let apiKey = "d0acf7f4fbfe6d9b905827e17faae31d";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";


// search for a temperature in specific city
function showTemp(response) {
    let temp = Math.round(response.data.main.temp);
    let tempElement = document.querySelector("#current-temp");
    tempElement.innerHTML = temp;
    console.log(response);
    let city = document.querySelector("#city");
    city.innerHTML = response.data.name;
}

function searchCity(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
    if (searchInput.value) {
        axios.get(`${apiUrl}q=${searchInput.value}&units=metric&appid=${apiKey}`).
            then(showTemp).catch(() => { alert("We can't find this city. Please try again!") });
    } else {
        alert("Please write the name of the city...");
    }
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);




// search for a temperature in current location
function findTemp(position) {
    axios.get(`${apiUrl}lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`).then(showTemp);
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



