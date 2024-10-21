window.addEventListener('DOMContentLoaded', () => {
  const API_KEY = '73030be134ef0bd220f5b0fe6f959051'
  const link = `http://api.weatherstack.com/current?access_key=${API_KEY}`

  const root = document.querySelector('#root')
  const popup = document.querySelector('#popup')
  const textInput = document.querySelector('#text-input')
  const form = document.querySelector('#form')
  const btnClose = document.querySelector('#close')

  let store = {
    city: 'Kyiv',
    temperature: 0,
    observationTime: '00:00 AM',
    isDay: 'yes',
    description: '',
    properties: {
      cloudcover: {},
      humidity: {},
      windSpeed: {},
      pressure: {},
      uvIndex: {},
      visibility: {},
    },
  }

  setHandlers()

  function setHandlers() {
    form.addEventListener('submit', handleSubmit)
    textInput.addEventListener('input', handleInput)
    btnClose.addEventListener('click', togglePopupClass)
  }

  function renderComponent() {
    root.innerHTML = markup()

    const city = document.getElementById('city')
    city.addEventListener('click', togglePopupClass)
  }

  function markup() {
    const { city, description, observationTime, temperature, isDay, properties } =
      store

    const containerClass = isDay === 'yes' ? 'is-day' : ''

    return `<div class="container ${containerClass}">
            <div class="top">
              <div class="city">
                <div class="city-subtitle">Weather Today in</div>
                  <div class="city-title" id="city">
                  <span>${city}</span>
                </div>
              </div>
              <div class="city-info">
                <div class="top-left">
                <img class="icon" src="./img/${getImage(description)}" alt="" />
                <div class="description">${description}</div>
              </div>
            
              <div class="top-right">
                <div class="city-info__subtitle">as of ${observationTime}</div>
                <div class="city-info__title">${temperature}°</div>
              </div>
            </div>
          </div>
        <div id="properties">${renderProperties(properties)}</div>
      </div>`
  }

  function renderProperties(properties) {
    return Object.values(properties)
      .map(({ title, value, icon }) => {
        return `<div class="property">
            <div class="property-icon">
              <img src="./img/icons/${icon}" alt="">
            </div>
            <div class="property-info">
              <div class="property-info__value">${value}</div>
              <div class="property-info__description">${title}</div>
            </div>
          </div>`
      })
      .join('')
  }

  function getImage(description) {
    const value = description.toLowerCase()

    switch (value) {
      case 'partly cloudy':
        return 'partly.png'
      case 'cloud':
        return 'cloud.png'
      case 'fog':
        return 'fog.png'
      case 'sunny':
        return 'sunny.png'
      case 'cloud':
        return 'cloud.png'
      default:
        return 'the.png'
    }
  }
})
