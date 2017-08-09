<template>
  <md-stepper md-vertical>
  <md-step md-label="Dunder Miflin">
    <md-input-container>
      <md-select v-model="countryCode" name="countryCode" id="countryCode" 
        @change="fetchAllStatesByCountry(states)">
        <md-option v-for="(country, key) in fetchAllCountries(countries)" :key="key" :value.sync="country.alpha2Code"
            >
           </md-icon> {{ country.name }}
        </md-option>
      </md-select>
    </md-input-container>
    <md-input-container>
      <md-select v-model="stateName" name="stateName" id="stateName" 
        >
        <md-option v-for="(state, key) in states" :key="key" :value.sync="state.region"
            >
           </md-icon> {{ state.region }}
        </md-option>
      </md-select>
    </md-input-container>
  </md-step>
  <md-step md-label="Scraton" md-message="Pennsylvania">
    <p>This seems something I need to focus on just after the first step.</p>
  </md-step>
 </md-stepper>
</template>

<script>
import { CountryAPI, RegionByCountryAPI } from '../http/http-common'
import store from '../store'
export default {
  data () {
    return {
      countryCode: '',
      country: {},
      countries: [],
      stateName: '',
      state: {},
      states: []
    }
  },
  methods: {
    showCountry () {
      this.getCountryByCode(this.country, this.getCountry)
    },
    getCountry (response) {
      window.alert('You selected: ' + response.name)
    },
    fetchAllCountries (countries) {
      if (store.state.countries !== null && store.state.countries.length > 0) {
        console.log('Old countries')
        this.countries = store.state.countries
        return this.countries
      } else {
        console.log('Refresh countries')
        CountryAPI.get('all').then(response => {
          var data = response.data
          console.log('get all')
          if (data.length > 0) {
            console.log('get all ytgt' + data.length)
            this.$store.commit('SET_COUNTRIES', data)
            countries = data
            return countries
          }
        }).catch(error => {
          console.log('Error occured: ' + error)
          return {}
        })
      }
    },
    getCountryByCode (country, callback) {
      console.log('Get country details')
      CountryAPI.get('alpha/' + this.countryCode).then(response => {
        var data = response.data
        console.log('Before: ' + data)
        if (data !== null) {
          country.name = data.name
          country.alpha2Code = data.alpha2Code
          country.flag = data.flag
          console.log(JSON.stringify(country))
          callback(country)
        }
      }).catch(error => {
        console.log('Error occured: ' + error)
      })
    },
    fetchAllStatesByCountry (states) {
      console.log('Refresh states')
      this.$http.get('https://battuta.medunes.net/api/region/' + this.countryCode + '/all?key=' + store.state.COUNTRY_API_KEY).then(response => {
        var data = response.data
        console.log('here')
        if (data.length > 0) {
          console.log('total: ' + data.length)
          states = data
          return states
        }
      }).catch(error => {
        console.log(JSON.stringify(error))
        return {}
      })
    },
    getStateByCode (state, callback) {
      console.log('Get state details')
      RegionByCountryAPI.get('alpha/' + this.countryCode).then(response => {
        var data = response.data
        console.log('Before: ' + data)
        if (data !== null) {
          state.stateName = data.region
          console.log(JSON.stringify(state))
          callback(state)
        }
      }).catch(error => {
        console.log(JSON.stringify(error))
      })
    }
  }
}
</script>

<style>
  
</style>
