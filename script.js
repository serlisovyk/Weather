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
  fetchData()

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

  async function fetchData() {
    try {
      const query = localStorage.getItem('query') || store.city
      const result = await fetch(`${link}&query=${query}`)
      const data = await result.json()

      const {
        current: {
          cloudcover,
          temperature,
          humidity,
          observation_time: observationTime,
          pressure,
          uv_index: uvIndex,
          visibility,
          is_day: isDay,
          weather_descriptions: description,
          wind_speed: windSpeed,
        },
        location: { name },
      } = data

      store = {
        ...store,
        isDay,
        city: name,
        temperature,
        observationTime,
        description: description[0],
        properties: {
          cloudcover: {
            title: 'cloudcover',
            value: `${cloudcover}%`,
            icon: 'cloud.png',
          },
          humidity: {
            title: 'humidity',
            value: `${humidity}%`,
            icon: 'humidity.png',
          },
          windSpeed: {
            title: 'wind speed',
            value: `${windSpeed} km/h`,
            icon: 'wind.png',
          },
          pressure: {
            title: 'pressure',
            value: `${pressure} %`,
            icon: 'gauge.png',
          },
          uvIndex: {
            title: 'uv Index',
            value: `${uvIndex} / 100`,
            icon: 'uv-index.png',
          },
          visibility: {
            title: 'visibility',
            value: `${visibility}%`,
            icon: 'visibility.png',
          },
        },
      }

      renderComponent()
    } catch {
      handleFetchError()
    }
  }

  function handleInput(e) {
    store = { ...store, city: e.target.value }
  }

  function handleSubmit(e) {
    e.preventDefault()
    const value = store.city

    if (!value) return null

    localStorage.setItem('query', value)
    fetchData()
    togglePopupClass()
    textInput.value = ''
  }

  function togglePopupClass() {
    popup.classList.toggle('active')
  }

  function markupError() {
    return `<div class="error">
              <h2>Something went wrong :(</h2>
              <button class="city-title" id="error">Search for another city</button>
            </div>`
  }

  function handleFetchError() {
    root.innerHTML = markupError()
    const btnError = document.getElementById('error')
    btnError.addEventListener('click', togglePopupClass)
  }
})
