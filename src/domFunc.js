import { callApi } from './apiFunc'
const mainContainer = document.querySelector('container')

const contentDiv = document.createElement('div')

const cityHeader = document.createElement('h1')

cityHeader.textContent = 'Hello'

contentDiv.append(cityHeader)
mainContainer.append(contentDiv)