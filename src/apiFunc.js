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
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=33&appid=a8bc01c3b61632b23dda8a1f7fe205b2&units=${units}`)
        const cityForecast = await response.json()
        let dailyForecastData = getDailyForecast(cityForecast)

        console.log(cityForecast);
        let formatedData = getDailyForecastData(dailyForecastData)
    
        return formatedData
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
        dayOne: response.list[0],
        dayTwo: response.list[8],
        dayThree: response.list[17],
        dayFour: response.list[26],
        dayFive: response.list[32]
    }
}

function getDailyForecastData(list) {
    let formattedObject = []
    for (const property in list) {
        let obj = {
            date: list[property].dt_txt,
            temp: list[property].main.temp,
            temp_min: list[property].main.temp_min,
            weather: list[property].weather[0].description
        }
        formattedObject.push(obj)
    }

    return formattedObject

}


export {callApi, callDailyForecastApi}