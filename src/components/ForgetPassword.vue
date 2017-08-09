<template>
    <div>
        <md-toolbar>
            <img src="../assets/collegefocus_60.png" class="image-toolbar" alt="college" />
            <span class="md-title content-magin-bottom">CollegeFocus</span>
        </md-toolbar>
        <md-layout md-row md-align="center" class="marginal">
            <md-layout md-column md-tag="md-card" class="card-container" md-flex="40" md-flex-medium="60" md-flex-small="80" md-flex-xsmall="90" md-align="center">
                <md-card-header>
                    <p class="md-title page-header">Request Password Reset</p>
                </md-card-header>
                <md-card-content>
                    <md-input-container>
                        <label>Email Address</label>
                        <md-input type="text" v-model="address" ></md-input>
                    </md-input-container>
                    <p>Longitude: {{ longitude }}</p>
                    <p>Latitude: {{ latitude }}</p>
                </md-card-content>
                <md-card-actions>
                    <md-layout md-column md-flex="100" md-flex-medium="100" md-flex-small="100" md-flex-xsmall="100">
                        <md-button md-theme="default" type="submit" @click.native="getLocationByAddress()"
                            class="md-raised md-accent round-button">Submit</md-button>
                    </md-layout>
                </md-card-actions>
            </md-layout>
        </md-layout>
    
    </div>
</template>

<script>
import { GeocodeAPI } from '../http/http-common'
import store from '../store'
export default {
  data () {
    return {
      address: '',
      longitude: 0,
      latitude: 0
    }
  },
  methods: {
    getLocationByAddress () {
      console.log('Address: ' + this.address)
      GeocodeAPI.get('json', {
        params: {
          address: this.address,
          key: store.state.GEO_API_KEY
        }
      }).then(response => {
        if (response.data.status === 'OK') {
          var data = response.data.results[0]
          this.longitude = data.geometry.location.lng
          this.latitude = data.geometry.location.lat
        } else {
          this.longitude = 0
          this.latitude = 0
        }
      }).catch(error => {
        console.log('Error: ' + error)
      })
    }
  }
}
</script>

<style>
  
</style>
