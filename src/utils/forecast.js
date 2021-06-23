const request = require('request');
const api = require('../api.json');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.weatherapi.com/v1/forecast.json?key=' + api.WeatherAPI + '&q='
        + latitude + ',' + longitude + '&days=7';
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to Weather Service!', undefined);
        } else if (response.body.error) {
            callback(response.body.error.message, undefined);
        } else {
            const data = {
                temp: response.body.current.temp_c,
                feelsLike: response.body.current.feelslike_c,
                lastUpdated: new Date(response.body.current.last_updated).toUTCString(),
                condition: response.body.current.condition.text,
                tempHigh: response.body.forecast.forecastday[0].day.maxtemp_c,
                tempLow: response.body.forecast.forecastday[0].day.mintemp_c,
                windSpeed: response.body.current.wind_kph,
                humidity: response.body.current.humidity
            };
            callback(undefined, data);
        }
    });
}

module.exports = forecast;