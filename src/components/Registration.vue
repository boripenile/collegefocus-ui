<template>
  <md-layout md-column class="marginal">
    <md-card-header class="page-header">
      <img src="../assets/collegefocus_60.png" rel="CollegeFocus" class="image-center"></img>
      <p class="md-title">School Registration</p>
    </md-card-header>
    <md-card-content>
      <md-stepper md-vertical>
      <md-step md-label="Type of Registration" 
      :md-continue="schoolTypeContinued" 
      md-back-continue="Next" md-icon="person">
        <md-layout md-row md-gutter md-flex="60" md-align="center"
            md-flex-medium="80" md-flex-small="100" md-flex-xsmall="100">
          <md-layout md-column md-flex="30" md-flex-medium="40" md-flex-small="50" md-flex-xsmall="70">
            <label class="md-subheading page-header">Click to select type of registration</label>
            <ul>
                <li v-for="service in services" v-on:click="toggleRegistration(service)" v-bind:class="{ 'active': service.active}">
                    {{service.name}}
                </li>
            </ul>
          </md-layout>
          <md-layout md-column md-flex="30" md-flex-medium="40" md-flex-small="50" md-flex-xsmall="70">
            <label class="md-subheading page-header">Click to select type of school</label>
            <ul>
                <li v-for="school in schools" v-on:click="toggleSchool(school)" v-bind:class="{ 'active': school.active}">
                    {{school.name}}
                </li>
            </ul>
          </md-layout>
        </md-layout>
      </md-step>
      <md-step md-label="Basic Information">
       <md-layout md-row md-gutter md-flex="60" md-flex-medium="60" md-flex-small="80" md-flex-xsmall="100">
         <md-layout md-row md-gutter md-flex="60"
            md-flex-medium="80" md-flex-small="80" md-flex-xsmall="100">
          <md-layout md-column md-flex="50" md-flex-medium="60" md-flex-small="90" md-flex-xsmall="90">
            <md-input-container>
              <label>School Name</label>
              <md-input @keyup.native="checkBasicInfo"
                required v-model="schoolData.schoolName"></md-input>
            </md-input-container>
          </md-layout>
          <md-layout md-column md-flex="50" md-flex-medium="60" md-flex-small="90" md-flex-xsmall="90">
            <md-input-container>
              <label>Abbreviation</label>
              <md-input v-model="schoolData.schoolShortName"></md-input>
            </md-input-container>
          </md-layout>
        </md-layout>
         <md-layout md-column md-flex="95" md-flex-medium="90" md-flex-small="80" md-flex-xsmall="100">
           <api-request :resource="getCountries" v-model="countryResponse">
            <md-input-container>
              <md-select v-if="countryResponse !== null" v-model="countryCode" name="countryCode" id="countryCode" 
                @change="getCountryByCodeAndState(fetchAllStatesByCountry)">
                  <md-option v-for="(country, key) in countryResponse.body" :key="key" :value.sync="country.alpha2Code">
                    {{ country.name }}
                  </md-option>
              </md-select>
              <md-icon class="country-icon">
                <img v-if="country != null" :src="country.flag" />
              </md-icon>
            </md-input-container>
          </api-request>
         </md-layout>
       </md-layout>
       <md-layout md-row md-flex="60" md-flex-medium="60" md-flex-small="80" md-flex-xsmall="100">
         <md-layout md-column md-flex="90" md-flex-medium="80" md-flex-small="80" md-flex-xsmall="100">
         <md-input-container>
          <md-select v-if="states != null" v-model="stateName" 
                name="stateName" id="stateName">
            <md-option v-for="(state, key) in states" :key="key" :value.sync="state.stateName">
              {{ state.stateName }}
            </md-option>
          </md-select>
        </md-input-container>
        </md-layout>
       </md-layout>
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
      states: [],
      services: [
        {
          name: 'Trial',
          active: false
        },
        {
          name: 'Standard',
          active: false
        },
        {
          name: 'Premium',
          active: false
        }
      ],
      schools: [
        {
          name: 'Private',
          active: false
        },
        {
          name: 'Government',
          active: false
        }
      ],
      schoolTypeContinued: false,
      basicContinued: true,
      addressContinued: false,
      contactContinued: false,
      contact: {
        contactName: '',
        contactEmail: '',
        phoneNumber: '',
        mobileNumber: '',
        faxNumber: ''
      },
      schoolData: {
        schoolType: null,
        schoolName: '',
        schoolShortName: '',
        schoolMotto: '',
        schoolUrl: '',
        registrationType: null,
        refererCode: '',
        admin: {
          username: '',
          email: '',
          password: ''
        },
        address: {
          state: '',
          country: '',
          city: '',
          addressLine1: '',
          addressLine2: '',
          latitude: '',
          longitude: '',
          postalCode: ''
        },
        contacts: []
      }
    }
  },
  methods: {
    isNullOrEmpty (data) {
      if (typeof (data) === 'number' || typeof (data) === 'boolean') {
        return false
      }
      if (typeof (data) === 'undefined' || data === null) {
        return true
      }
      if (typeof (data.length) !== 'undefined') {
        return data.length === 0
      }
      var count = 0
      for (var i in data) {
        if (data.hasOwnProperty(i)) {
          count++
        }
      }
      return count === 0
    },
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
        var data = this.$superagent.get('https://restcountries.eu/rest/v2/all')
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
      this.states = []
      RegionByCountryAPI.get('states/country/' + this.countryCode)
      .then(response => {
        this.states = response.data.data
      }).catch(error => {
        console.log('Error: ' + error)
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
    },
    checkBasicInfo () {
      if (!this.schoolData.registrationType ||
          !this.schoolData.schoolType) {
        this.schoolTypeContinued = false
      } else {
        this.basicContinued = true
      }
    },
    checkSchoolType () {
      var service = false
      var type = false
      for (var i = 0; i < this.services.length; i++) {
        if (this.services[i].active) {
          service = true
        }
      }
      for (var j = 0; j < this.schools.length; j++) {
        if (this.schools[j].active) {
          type = true
        }
      }
      if (service && type) {
        this.schoolTypeContinued = true
      }
    },
    toggleRegistration (s) {
      for (var i = 0; i < this.services.length; i++) {
        if (this.services[i].active) {
          this.services[i].active = false
        }
      }
      s.active = !s.active
      if (s.active) {
        this.schoolData.registrationType = s.name
      }
      console.log('type: ' + this.schoolData.registrationType + ', school: ' + this.schoolData.schoolType)
      this.checkSchoolType()
    },
    toggleSchool (s) {
      for (var i = 0; i < this.schools.length; i++) {
        if (this.schools[i].active) {
          this.schools[i].active = false
        }
      }
      s.active = !s.active
      if (s.active) {
        this.schoolData.schoolType = s.name
      }
      console.log('type: ' + this.schoolData.registrationType + ', school: ' + this.schoolData.schoolType)
      this.checkSchoolType()
    }
  },
  mounted () {
    this.checkBasicInfo()
    this.checkSchoolType()
  }
}
</script>

<style>
  .country-icon {
    height: 28px;
    width: 48px;
  }
  ul{
    list-style:none;
    color:#fff;
    font-size:16px;
    font-weight:bold;
    text-align: center;
    margin:20px 0 15px;
  }

  ul li{
      padding:10px 20px;
      background-color:#e35885;
      margin-bottom:8px;
      box-shadow:0 1px 1px rgba(0,0,0,0.1);
      cursor:pointer;
  }

  ul li span{
      float:right;
  }

  ul li.active{
      background-color:#8ec16d;
  }
</style>
