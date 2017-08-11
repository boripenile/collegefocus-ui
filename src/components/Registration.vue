<template>
  <md-layout md-column md-flex="60" md-flex-medium="80" 
    md-flex-small="80" md-flex-xsmall="100" class="marginal">
    <md-card-header class="page-header">
      <img src="../assets/collegefocus_60.png" rel="CollegeFocus" class="image-center"></img>
      <p class="md-title">School Registration</p>
    </md-card-header>
    <md-card-content>
      <md-stepper md-vertical>
      <md-step md-label="Dunder Miflin">
    
    <api-request :resource="getCountries" v-model="countryResponse">
      <md-input-container>
        <md-select v-if="countryResponse !== null" v-model="countryCode" name="countryCode" id="countryCode" 
          @change="getCountryByCodeAndState(fetchAllStatesByCountry)">
            <md-option v-for="(country, key) in countryResponse.body" :key="key" :value.sync="country.alpha2Code">
              {{ country.name }}
            </md-option>
        </md-select>
        <md-select v-else>
            <md-option value="1">Yes</md-option>
            <md-option value="2">No</md-option>
          </md-select>
        </md-input-container>
    </api-request>
    <!-- <api-request>
      
    </api-request> -->
    <md-input-container>
      <md-select v-if="states != null" v-model="stateName" name="stateName" id="stateName" 
        >
        <md-option v-if="states != null" v-for="(state, key) in states" :key="key" :value.sync="state.region">
           {{ state.region }}
        </md-option>
      </md-select>
      <md-select v-else="states != null" v-model="stateName" name="stateName" id="stateName" 
        >
        <md-option v-for="(state, key) in states" :key="key" :value.sync="state.region">
           {{ state.region }}
        </md-option>
      </md-select>
    </md-input-container>
  </md-step>
  <md-step md-label="Scraton" md-message="Pennsylvania">
    <p>This seems something I need to focus on just after the first step.</p>
  </md-step>
 </md-stepper>
    </md-card-content>
  </md-layout>
</template>

<script>
import { CountryAPI, RegionByCountryAPI } from '../http/http-common'
import store from '../store'
import jquery from 'jquery'
export default {
  data () {
    return {
      total: 0,
      countryCode: '',
      country: {},
      countries: [],
      countryResponse: null,
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
    getCountries () {
      if (store.state.countryResponse !== null) {
        console.log('Old countries')
        return store.state.countryResponse
      } else {
        var data = this.$http.get('https://restcountries.eu/rest/v2/all')
        if (data !== null) {
          console.log('get all contries' + data)
          this.$store.commit('SET_COUNTRIES', data)
          this.countryResponse = data
          return data
        }
      }
    },
    getCountryByCodeAndState (callback) {
      console.log('Get country details')
      CountryAPI.get('alpha/' + this.countryCode).then(response => {
        var data = response.data
        console.log('Before: ' + data)
        if (data !== null) {
          this.country.name = data.name
          this.country.alpha2Code = data.alpha2Code
          this.country.flag = data.flag
          console.log(JSON.stringify(this.country))
          callback(this.country)
        }
      }).catch(error => {
        console.log('Error occured: ' + error)
      })
    },
    fetchAllStatesByCountry (selectedCountry) {
      console.log('Refresh states by country')

      jquery.ajax({
        // url: 'https://battuta.medunes.net/api/region/' + this.countryCode + '/all/?key=' + store.state.COUNTRY_API_KEY,
        url: 'https://battuta.medunes.net/api/region/' + selectedCountry.alpha2Code + '/all?key=785caf1227be1502db4107297454cb1d',
        type: 'GET',
        dataType: 'application/json',
        success: function (response) {
          if (response.statusCode === '301') {
            console.log('301 - redirect to: ' + response.location)
          }
          console.log(JSON.stringify(response))
          this.states = response
        },
        error: function (response) {
          if (response.statusCode === '301') {
            console.log('301 - redirect to: ' + response.location)
          }
          console.log(JSON.stringify(response))
        }
      })
      // this.$http.get('http://battuta.medunes.net/api/region/' + this.countryCode + '/all?key=' + store.state.COUNTRY_API_KEY).then(response => {
      //   var data = response.data
      //   console.log('here')
      //   if (data.length > 0) {
      //     console.log('total: ' + data.length)
      //     states = data
      //     return states
      //   }
      // }).catch(error => {
      //   console.log(JSON.stringify(error))
      //   return {}
      // })
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
