const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

let cityName = "New Delhi"; 
let weatherInfo = null;
let errorMessage = null;

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(express.static("public"));

app.get('/', function(req, res){
    
    getWeatherData(cityName, res);
});

app.post('/', function(req, res){
    
    cityName = req.body.city;

    
    getWeatherData(cityName, res);
});

function getWeatherData(city, res) {
    const apiKey = "af0cb5a50f407b476ab109bf32e7afc6";
    const apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
    const url = apiEndpoint + city + "&appid=" + apiKey;

    https.get(url, function(response){
        console.log(response.statusCode);

        if (response.statusCode === 200) {
            let rawData = '';

            response.on("data", function(chunk){
                rawData += chunk;
            });

            response.on("data", function(){
                
                const weatherData = JSON.parse(rawData);
                
                const temp = weatherData.main.temp;
                const weatherDescription = weatherData.weather[0].description;
                const icon = weatherData.weather[0].icon;
                const iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
                const city = weatherData.name;
                const humidity = weatherData.main.humidity;
                const windSpeed = weatherData.wind.speed;
                
                weatherInfo = {
                    temperature: temp,
                    description: weatherDescription,
                    iconUrl: iconUrl,
                    cityName: city,
                    humidity: humidity,
                    windSpeed: windSpeed
                };

                errorMessage = null;

                res.render('index', { weatherInfo, errorMessage });
            });
        } else {
            errorMessage = "City not found. Please try again.";
            weatherInfo = null;
            res.render('index', { weatherInfo, errorMessage });
        }
    });
}

app.listen(3000, function(){
    console.log("Server is listening on port 3000");
});
