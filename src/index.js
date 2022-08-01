import './style.css';
import { callApi, callDailyForecastApi } from './apiFunc'

(function WeatherApp() {
// Main body container
const contentContainer = document.querySelector('.content-container')
const mainContainer = document.querySelector('.card-container')
const dailyForecastContainer = document.querySelector('.daily-forecast-container')
// ContentDiv 
const contentDiv = document.createElement('div')
const DailyForecastDiv = document.createElement('div')
DailyForecastDiv.classList = 'daily-forecast-div'
contentDiv.classList = 'city-card'
// City info
const cityHeader = document.createElement('h1')
const cityTemp = document.createElement('h2')
const feelsLike = document.createElement('h3')
const weatherDesc = document.createElement('h3')
const weatherIcon = document.createElement('img')
// Change temp unit div
const changeUnitDiv = document.createElement('div')
changeUnitDiv.classList = 'unit-div'
const currentUnitText = document.createElement('h5')

changeUnitDiv.append(currentUnitText)
contentDiv.append(cityHeader, cityTemp, feelsLike,weatherDesc, weatherIcon, changeUnitDiv)
mainContainer.append(contentDiv, dailyForecastContainer)

// Current unit for temperature, metric as default
let unit = 'metric'
let unitText = '°C'

// User's city
let userInput = ''

let searchButton = document.getElementById('submit-button')
searchButton.addEventListener('click', function(e){
    // Reset Daily forecast div
    DailyForecastDiv.innerHTML = ''
    e.preventDefault()
    // User search and input value
    let searchBox = document.getElementById('search-box')
    userInput = searchBox.value

    searchBox.value = ''

    //let cityData = callApi(userInput, unit)

    //cityData.then((data) => addTextContent(data))
    displayContent(userInput, unit)

   //contentDiv.style.visibility = 'visible'
    currentUnitText.textContent = 'Display °F'
}) 

// Adds city data to div
function addTextContent(data) {
    cityHeader.textContent = data.name + ', ' + data.country
    cityTemp.textContent = data.temp + ' ' + unitText
    feelsLike.textContent = `Feels like: ${data.feelsLike}°`
    weatherDesc.textContent = data.weather
    weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.icon}@2x.png`)
}

function addDailyForecastTextContent(data) {
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    
    for (let i = 0; i < data.length; i++) {
        let div = document.createElement('div')
        const currentDay = document.createElement('h1')
        const currentTemp = document.createElement('h3')
        const currentMinTemp = document.createElement('h5')
        const currentWeather = document.createElement('h4')
        const dailyIcon = document.createElement('img')

        let day = new Date(data[i].date)
        let temp = data[i].temp
        //let tempMin = data[i].temp_min
        let weather = data[i].weather
        let icon = data[i].icon

        currentDay.textContent = weekday[day.getDate()]
        currentTemp.textContent = temp + ' ' + unitText
        //currentMinTemp.textContent = tempMin + ' ' + unitText
        currentWeather.textContent = weather
        dailyIcon.setAttribute('src', `http://openweathermap.org/img/wn/${icon}@2x.png`)

        div.append(currentDay, currentTemp, currentWeather, dailyIcon)
        DailyForecastDiv.append(div)
        contentContainer.append(DailyForecastDiv)
}}


function displayContent(userInput, unit) {
    let cityData = callApi(userInput, unit)
    cityData.then((data) => {

        let lat = data.lat
        let lon = data.lon

        contentDiv.style.visibility = 'visible'
        addTextContent(data)

        // Returns and calls daily forecast API as well with lat & lon
        return callDailyForecastApi(lat, lon, unit)
    })
    .then((data) => {
        addDailyForecastTextContent(data)
        })
    }

// Change current measurement unit text
changeUnitDiv.addEventListener('click', function() {
    unit = changeUnit()
    displayContent(userInput, unit)
})

function changeUnit() {
    //Reset daily forecast div first
    DailyForecastDiv.innerHTML = ''

    let newUnit = ''
    if (currentUnitText.innerText === 'Display °F') {
        currentUnitText.textContent = 'Display °C'
        newUnit = 'imperial'
        unitText = '°F'
    } else {
        currentUnitText.textContent = 'Display °F'
        newUnit = 'metric'
        unitText = '°C'
    }
    return newUnit
}
})()
