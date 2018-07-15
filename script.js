let weather;
const apiKey = '795fcdbce31782777bb75eed416aaa9d';
const nowTE = document.querySelector(".nowtem");
const place = document.querySelector(".place");
const inputCity = document.querySelector(".inputCity.text");
const description = document.querySelector(".description");
const imagePlace = document.querySelector(".imagePlace");

navigator.geolocation.getCurrentPosition(success, error);
function success(pos) {
    const lat = pos.coords.latitude;
    const long = pos.coords.longitude;
    weatherGeo(lat, long);
}
function error() {
    console.log('There was an error');
}
function weatherGeo(lat, long) {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=Metric&appid=${apiKey}`;
    fetch(url)
        .then(res => res.json())
        .then((out) => {
            resoleved(out);
        })
        .catch(err => {
            rejected(err);
            throw err
        });
}
let city;
function weatherOfCity(city) {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${apiKey}`;
    let dajweather = new Promise((resolve, reject) => {
        fetch(url)
            .then(res => res.json())
            .then((out) => {
                resolve(out);
            })
            .catch(err => {
                rejected(err);
                throw err
            });
    });
    dajweather.then(resoleved).catch(rejected);
}
function rejected(reason) {
    nowTE.textContent = "💩";
    imagePlace.textContent = "";
    description.textContent = "Invalid city name";
    inputCity.classList.add("shake");
    console.log(reason);
}
function resoleved(response) {
    weather = response;
    place.textContent = weather.name;
    nowTE.textContent = Math.trunc(weather.main.temp) + "℃";
    description.textContent = weather.weather[0].description;
    const id = weather.weather[0].id;
    if (id == 800) {
        imagePlace.innerHTML = ' <img src="img/800.png" alt="Sun" > '
    } else if (id >= 200 && id <= 232) {
        imagePlace.innerHTML = ' <img src="img/200-232.png" alt="Sun" > '
    } else if (id >= 300 && id <= 531) {
        imagePlace.innerHTML = ' <img src="img/300-531.png" alt="Sun" > '
    } else if (id >= 801 && id <= 804) {
        imagePlace.innerHTML = ' <img src="img/801-804.png" alt="Sun" > '
    } else if (id >= 701 && id <= 781) {
        imagePlace.innerHTML = ' <img src="img/701-781.png" alt="Sun" > '
    }
}
function TakeWet() {
    inputCity.classList.remove("shake");
    city = this[0].value;
    weatherOfCity(city);
}
const form = document.querySelector('form');
form.addEventListener("submit", TakeWet);