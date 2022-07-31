import './style.css';
import { callApi, callDailyForecastApi } from './apiFunc'

(function WeatherApp() {
// Main body container
const mainContainer = document.querySelector('.card-container')
// ContentDiv 
const contentDiv = document.createElement('div')
contentDiv.classList = 'city-card'
// City info
const cityHeader = document.createElement('h1')
const cityTemp = document.createElement('h2')
const feelsLike = document.createElement('h3')
const weatherDesc = document.createElement('h3')
// Change temp unit div
const changeUnitDiv = document.createElement('div')
changeUnitDiv.classList = 'unit-div'
const currentUnitText = document.createElement('h5')

changeUnitDiv.append(currentUnitText)
contentDiv.append(cityHeader, cityTemp, feelsLike,weatherDesc, changeUnitDiv)
mainContainer.append(contentDiv)

// Current unit for temperature, metric as default
let unit = 'metric'
let unitText = '°C'

// User's city
let userInput = ''

let searchButton = document.getElementById('submit-button')
searchButton.addEventListener('click', function(e){
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
}


function displayContent(userInput, unit) {
    let cityData = callApi(userInput, unit)
    cityData.then((data) => {

        let lat = data.lat
        let lon = data.lon

        contentDiv.style.visibility = 'visible'
        addTextContent(data)

        // Calls daily forecast API as well with lat & lon
        callDailyForecastApi(lat, lon, unit)
    })
}

// Change current measurement unit text
changeUnitDiv.addEventListener('click', function() {
    unit = changeUnit()
    displayContent(userInput, unit)
})

function changeUnit() {
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
