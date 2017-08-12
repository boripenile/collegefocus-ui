<template>
  <md-layout md-column class="marginal" md-flex="60"
            md-flex-medium="80" md-flex-small="100" md-flex-xsmall="100">
    <md-card-header class="page-header">
      <img src="../assets/collegefocus_60.png" rel="CollegeFocus" class="image-center"></img>
      <p class="md-title">School Registration</p>
    </md-card-header>
    <md-card-content>
      <md-stepper md-vertical>
      <md-step md-label="Type of Registration" 
      :md-continue="schoolTypeContinued" 
      md-back-continue="Next" md-icon="person">
        <md-layout md-row md-gutter="16" md-flex="60" md-align="center"
            md-flex-medium="80" md-flex-small="100" md-flex-xsmall="100">
          <md-layout class="register" md-column md-flex="30" md-flex-medium="40" md-flex-small="50" md-flex-xsmall="70">
            <label class="md-subheading page-header">Click to select type of registration</label>
            <ul>
                <li v-for="(service, key) in services" :key="key" 
                v-on:click="toggleRegistration(service)" v-bind:class="{ 'active': service.active}">
                    {{service.name}}
                </li>
            </ul>
          </md-layout>
          <md-layout class="register" md-column md-flex="30" md-flex-medium="40" md-flex-small="50" md-flex-xsmall="70">
            <label class="md-subheading page-header">Click to select type of school</label>
            <ul>
                <li v-for="(school, key) in schools" :key="key" 
                v-on:click="toggleSchool(school)" v-bind:class="{ 'active': school.active}">
                    {{school.name}}
                </li>
            </ul>
          </md-layout>
        </md-layout>
      </md-step>
      <md-step md-label="Basic Information" 
      :md-continue="basicContinued" >
       <div class="page-header">
           <p>
            <span class="md-subheading">Please Complete your basic information</span>
             <br/><span>(*) indicates required fields</span>   
           </p>  
       </div>   
       <md-layout md-row md-gutter="16" md-align="center">
          <md-layout md-column md-flex="40" md-flex-medium="50" md-flex-small="80" md-flex-xsmall="90">
            <md-input-container  md-clearable>
              <label>School Name</label>
              <md-input @keyup.native="checkBasicInfo()"
                required v-model="schoolData.schoolName"></md-input>
            </md-input-container>
          </md-layout>
          <md-layout md-column md-flex="40" md-flex-medium="50" md-flex-small="80" md-flex-xsmall="90">
            <md-input-container  md-clearable>
              <label>Abbreviation</label>
              <md-input v-model="schoolData.schoolShortName"></md-input>
            </md-input-container>
          </md-layout>
       </md-layout>
       <md-layout md-row md-gutter="16" md-align="center">
          <md-layout md-column md-flex="40" md-flex-medium="50" md-flex-small="80" md-flex-xsmall="90">
            <md-input-container  md-clearable>
              <label>School Motto</label>
              <md-input @keyup.native="checkBasicInfo()"
                required v-model="schoolData.schoolMotto"></md-input>
            </md-input-container>
          </md-layout>
          <md-layout md-column md-flex="40" md-flex-medium="50" md-flex-small="80" md-flex-xsmall="90">
            <md-input-container  md-clearable>
              <label>School Url</label>
              <md-input v-model="schoolData.schoolUrl"></md-input>
            </md-input-container>
          </md-layout>
       </md-layout>
      </md-step>
      <md-step md-label="Address" :md-continue="addressContinued" 
      md-icon="home">
        <div class="page-header">
           <p>
            <span class="md-subheading">Please complete your school location</span>
             <br/><span>(*) indicates required fields</span>   
           </p>  
       </div>
       <md-layout md-row md-gutter="16" md-align="center">
          <md-layout md-column md-flex="50" md-flex-medium="80" md-flex-small="80" md-flex-xsmall="90">
            <md-input-container  md-clearable>
              <label>Address Line  1</label>
              <md-input @keyup.native="checkAddressInfo()" type="textarea"
                required v-model="schoolData.address.addressLine1"></md-input>
            </md-input-container>
          </md-layout>
          <md-layout md-column md-flex="50" md-flex-medium="80" md-flex-small="80" md-flex-xsmall="90">
            <md-input-container  md-clearable>
              <label>Address Line  2</label>
              <md-input @keyup.native="checkAddressInfo()" type="textarea"
                required v-model="schoolData.address.addressLine2"></md-input>
            </md-input-container>
          </md-layout>
       </md-layout>
       <md-layout md-row md-gutter="16" md-align="center">
          <md-layout md-column md-flex="30" md-flex-medium="80" md-flex-small="80" md-flex-xsmall="90">
            <api-request :resource="getCountries" v-model="countryResponse">
            <md-input-container>
              <label>Select your country</label>
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
          <md-layout md-column md-flex="30" md-flex-medium="80" md-flex-small="80" md-flex-xsmall="90">
            <md-input-container>
              <label>State/Region</label>
              <md-select v-if="states != null" v-model="stateName"
                @change="setStateName()"
                name="stateName" id="stateName">
                    <md-option v-for="(state, key) in states" :key="key" 
                    v-if="state.stateName.indexOf('?') === -1 && state.stateName !== null"
                    :value.sync="state.stateName">
                           {{ state.stateName }}        
                    </md-option>
                </md-select>
              <md-select v-else v-model="stateName" 
                name="stateName" id="stateName">
                    <md-option>{{ stateName }}</md-option>
                </md-select>
            </md-input-container>
          </md-layout>
          <md-layout md-column md-flex="30" md-flex-medium="80" md-flex-small="80" md-flex-xsmall="90">
            <md-input-container  md-clearable>
              <label>City</label>
              <md-input @keyup.native="checkAddressInfo()"
              required v-model="schoolData.address.city"></md-input>
            </md-input-container>
          </md-layout>
       </md-layout>
      </md-step>
      <md-step md-label="School Contact" 
      :md-continue="contactContinued" 
      md-icon="person">
        <div class="page-header">
           <p>
            <span class="md-subheading">Please complete your primary contact details</span>
             <br/><span>(*) indicates required fields</span>   
           </p>  
       </div>  
        <md-layout md-row md-gutter="16" md-flex="60" md-align="center"
            md-flex-medium="80" md-flex-small="100" md-flex-xsmall="100">
          <md-layout md-column md-flex="30" md-flex-medium="40" md-flex-small="50" md-flex-xsmall="70">
            <md-input-container  md-clearable>
              <label>Contact Name</label>
              <md-input @keyup.native="checkContactInfo()" required v-model="contact.contactName"></md-input>
            </md-input-container>
          </md-layout>
          <md-layout md-column md-flex="30" md-flex-medium="40" md-flex-small="50" md-flex-xsmall="70">
            <md-input-container  md-clearable>
              <label>Contact Email</label>
              <md-input @keyup.native="checkContactInfo()" required type="email" v-model="contact.contactEmail"></md-input>
            </md-input-container>
          </md-layout>
        </md-layout>
        <md-layout md-row md-gutter="16" md-flex="60" md-align="center"
            md-flex-medium="80" md-flex-small="100" md-flex-xsmall="100">
          <md-layout md-column md-flex="30" md-flex-medium="40" md-flex-small="50" md-flex-xsmall="70">
            <md-input-container  md-clearable>
              <label>Phone Number (office)</label>
              <md-input type="number" @keyup.native="checkContactInfo()" required v-model="contact.phoneNumber"></md-input>
            </md-input-container>
          </md-layout>
          <md-layout md-column md-flex="30" md-flex-medium="40" md-flex-small="50" md-flex-xsmall="70">
            <md-input-container  md-clearable>
              <label>Mobile Number</label>
              <md-input type="number" @keyup.native="checkContactInfo()" required v-model="contact.mobileNumber"></md-input>
            </md-input-container>
          </md-layout>
        </md-layout>
      </md-step>
      <md-step md-label="System Administrator" 
      :md-continue="adminContinued" 
      md-icon="person">
        <div class="page-header">
           <p>
            <span class="md-subheading">Please complete your super administrator details</span>
             <br/><span>(*) indicates required fields</span>   
           </p>  
       </div>  
        <md-layout md-row md-gutter="16" md-flex="80" md-align="center"
            md-flex-medium="80" md-flex-small="100" md-flex-xsmall="100">
          <md-layout md-column md-flex="30" md-flex-medium="80" md-flex-small="80" md-flex-xsmall="90">
            <md-input-container  md-clearable>
              <label>Email Address</label>
              <md-input @keyup.native="checkAdminInfo()" required type="email" v-model="schoolData.admin.email"></md-input>
            </md-input-container>
          </md-layout>
          <md-layout md-column md-flex="30" md-flex-medium="80" md-flex-small="80" md-flex-xsmall="90">
            <md-input-container  md-clearable>
              <label>Username</label>
              <md-input required type="text" @keyup.native="checkAdminInfo()"
              v-model="schoolData.admin.username"></md-input>
            </md-input-container>
          </md-layout>
          <md-layout md-column md-flex="30" md-flex-medium="80" md-flex-small="80" md-flex-xsmall="90">
            <md-input-container md-has-password>
              <label>Password</label>
              <md-input required type="password" @keyup.native="checkAdminInfo()"
              v-model="schoolData.admin.password" >
              </md-input>
              <span v-if="isValidLength" 
                class="md-error">Password must be atleast 6 characters</span>
            </md-input-container>
          </md-layout>
        </md-layout>
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
      isValidLength: false,
      searchable: true,
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
      basicContinued: false,
      addressContinued: false,
      contactContinued: false,
      adminContinued: false,
      contact: {
        contactName: '',
        contactEmail: '',
        phoneNumber: '',
        mobileNumber: '',
        faxNumber: ''
      },
      schoolData: {
        schoolType: null,
        schoolName: null,
        schoolShortName: null,
        schoolMotto: null,
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
    setStateName () {
      if (this.stateName) {
        console.log('State name: ' + this.stateName)
        this.schoolData.address.state = this.stateName
        console.log(JSON.stringify(this.schoolData))
        this.checkAddressInfo()
      }
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
        this.stateName = ''
        return store.state.countryResponse
      } else {
        var data = this.$superagent.get('https://restcountries.eu/rest/v2/all')
        if (data !== null) {
          this.stateName = ''
          console.log('get all contries' + data)
          this.$store.commit('SET_COUNTRIES', data)
          this.countryResponse = data
          return data
        }
      }
    },
    getGeoLatLng (registerCallback) {

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
          this.schoolData.address.country = this.country.name
          console.log(JSON.stringify(this.schoolData))
          callback(this.country)
        }
      }).catch(error => {
        console.log('Error occured: ' + error)
      })
    },
    fetchAllStatesByCountry (selectedCountry) {
      this.checkAddressInfo()
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
      if (this.schoolData.schoolName && this.schoolData.schoolMotto) {
        this.basicContinued = true
        console.log('After 1: ' + this.basicContinued)
      } else {
        this.basicContinued = false
      }
    },
    checkAdminInfo () {
      if (this.schoolData.admin.password < 6) {
        this.isValidLength = true
      }
      if (this.schoolData.admin.email && this.schoolData.admin.username &&
      (this.schoolData.admin.password.length === 6 ||
      this.schoolData.admin.password.length > 6) && this.isValidLength) {
        this.adminContinued = true
        console.log('After 1: ' + this.adminContinued)
      } else {
        this.adminContinued = false
      }
    },
    checkContactInfo () {
      if (this.contact.contactName && this.contact.contactEmail &&
      this.contact.phoneNumber && this.contact.mobileNumber) {
        this.schoolData.contacts.push(this.contact, 0)
        this.contactContinued = true
        console.log('After 1: ' + this.contactContinued)
      } else {
        this.contactContinued = false
      }
    },
    checkAddressInfo () {
      if (this.schoolData.address.addressLine1 && this.schoolData.address.country && this.schoolData.address.city) {
        if (this.schoolData.address.state && !this.schoolData.address.city) {
          this.addressContinued = false
        } else {
          this.addressContinued = true
        }
      } else {
        this.addressContinued = false
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
      this.checkSchoolType()
    }
  },
  mounted () {
    this.checkSchoolType()
    this.checkAddressInfo()
    this.checkBasicInfo()
  }
}
</script>

<style>
  .country-icon {
    height: 28px;
    width: 48px;
  }
  .register ul{
    list-style:none;
    color:#fff;
    font-size:16px;
    font-weight:bold;
    text-align: center;
    margin:20px 0 15px;
  }

  .register ul li{
      padding:10px 20px;
      background-color:#e35885;
      margin-bottom:8px;
      box-shadow:0 1px 1px rgba(0,0,0,0.1);
      cursor:pointer;
  }

  .register ul li span{
      float:right;
  }

  .register ul li.active{
      background-color:#8ec16d;
  }
</style>