import './style.css';
import { callApi } from './apiFunc'
// Main body container
const mainContainer = document.querySelector('.card-container')
// ContentDiv 
const contentDiv = document.createElement('div')
contentDiv.classList = 'city-card'
// City 
const cityHeader = document.createElement('h1')
const cityTemp = document.createElement('h2')
const feelsLike = document.createElement('h3')

contentDiv.append(cityHeader, cityTemp, feelsLike)
mainContainer.append(contentDiv)

let button = document.getElementById('submit-button')

button.addEventListener('click', function(e){
    e.preventDefault()
    let searchBox = document.getElementById('search-box')
    let userInput = searchBox.value

    let cityData = callApi(userInput, 'metric')

    cityData.then((data) => addTextContent(data))
}) 

function addTextContent(data) {
    cityHeader.textContent = data.name + ', ' + data.country
    cityTemp.textContent = data.temp + '°'
    feelsLike.textContent = `Feels like: ${data.feelsLike}`
}