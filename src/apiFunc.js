async function callApi(city, units) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a8bc01c3b61632b23dda8a1f7fe205b2&units=${units}`)
        const cityWeather = await response.json()
        
        // Get data needed only
        let cityData = getWeatherData(cityWeather)

        console.log(cityData);
        return cityData
        
    }
    catch(err) {
        console.log(err);
    }
}   

async function callDailyForecastApi(lat, lon, units) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=7&appid=a8bc01c3b61632b23dda8a1f7fe205b2&units=${units}`)
        const cityForecast = await response.json()
        let dailyForecastData = getDailyForecast(cityForecast)

        console.log(dailyForecastData.list);
        return dailyForecastData
    } 
    catch(err) {
        console.log(err);
    }
}


// Create object with data needed from api response
function getWeatherData(response) {
    return {temp: response.main.temp,
            weather: response.weather[0].description,
            feelsLike: response.main.feels_like,
            temp_min: response.main.temp_min,
            temp_max: response.main.temp_max,
            humidity: response.main.humidity,
            name: response.name,
            country: response.sys.country,
            lat: response.coord.lat,
            lon: response.coord.lon,
        }
}

function getDailyForecast(response) {
    return {
        list: response.list
    }
}


export {callApi, callDailyForecastApi}