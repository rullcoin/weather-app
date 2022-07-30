import './style.css';

async function callApi(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a8bc01c3b61632b23dda8a1f7fe205b2&units=metric`)
        const cityWeather = await response.json()
    
        let cityData = getWeather(cityWeather)

        console.log(cityWeather);
    }
    catch(err) {
        console.log(err);
    }
}   

function getWeather(response) {

    return {temp: response.main.temp,
            weather: response.weather[0].main

        }

}

callApi('montreal')