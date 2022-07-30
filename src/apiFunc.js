async function callApi(city, units) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a8bc01c3b61632b23dda8a1f7fe205b2&units=${units}`)
        const cityWeather = await response.json()
        
        // Get data needed only
        let cityData = getWeatherData(cityWeather)

        console.log(cityWeather);
        return cityData
        
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
        }
}

export {callApi}