console.log('Client side javascript file is loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const city = document.getElementById('city');
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const feel = document.getElementById('feel');
const weather = document.getElementById('weather');
const hiLow = document.getElementById('hi-low');
const details = document.getElementById('details');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;

    city.innerHTML = 'Loading...';
    temp.innerHTML = '-';
    date.innerHTML = '-';
    feel.innerHTML = '-';
    weather.innerHTML = '-';
    hiLow.innerHTML = '-';
    details.innerHTML = '-';

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                city.innerHTML = data.error;
            } else {
                city.innerHTML = data.location;
                date.innerHTML = data.forecast.lastUpdated;
                temp.innerHTML = data.forecast.temp + '<span>°c</span>';
                feel.innerHTML = 'Feels like: ' + data.forecast.feelsLike + '<span>°c</span>';
                weather.innerHTML = data.forecast.condition;
                hiLow.innerHTML = data.forecast.tempLow + '°c / ' + data.forecast.tempHigh + '°c';
                details.innerHTML = 'Wind Speed: ' + data.forecast.windSpeed +
                    'kmph&nbsp;&nbsp;&nbsp;&nbsp; Humidity: ' + data.forecast.humidity + '%';
            }
        });
    });
});