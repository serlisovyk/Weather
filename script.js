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
})
