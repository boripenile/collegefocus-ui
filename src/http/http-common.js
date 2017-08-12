import axios from 'axios'
// import store from '../store'

export const HTTP = axios.create({
  baseURL: 'http://localhost:8090/collegefocusws/api/',
  headers: {
    common: {'Authorization': window.localStorage.getItem('token')}
  }
})

export const HTTP2 = axios.create({
  baseURL: 'http://localhost:8090/collegefocusws/api/'
})

export const GeocodeAPI = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/geocode/'
})

export const CountryAPI = axios.create({
  baseURL: 'https://restcountries.eu/rest/v2/'
})

export const RegionByCountryAPI = axios.create({
  baseURL: 'http://localhost:8090/collegefocusws/api/commons/'
})

export const LgasByRegionAPI = axios.create({
  baseURL: 'http://localhost:8090/collegefocusws/api/commons/'
})
