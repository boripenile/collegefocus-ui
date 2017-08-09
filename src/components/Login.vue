<template>
  <div>
    <md-toolbar>
        <img src="../assets/collegefocus_60.png" class="image-toolbar" alt="college"/>
        <span class="md-title content-magin-bottom">CollegeFocus</span>
    </md-toolbar>
    <md-layout class="marginal">
        <md-layout md-tag="form" novalidate @submit.native.prevent="checkCred()" md-align="center">
            <md-layout md-tag="md-card" class="card-container" md-column md-flex="40" md-flex-medium="60" 
            md-flex-small="80" md-flex-xsmall="90">
                <md-card-header>
                    <div class="md-title">Login</div>
                </md-card-header>
    
                <md-card-content>
                    <md-input-container>
                        <md-icon>person</md-icon>
                        <label>Username</label>
                        <md-input required v-model="username" />
                    </md-input-container>
    
                    <md-input-container md-has-password>
                        <md-icon>lock</md-icon>
                        <label>Password</label>
                        <md-input type="password" required v-model="password" />
                    </md-input-container>
                </md-card-content>
    
                <md-card-actions>
                    <md-layout md-column md-flex="100" md-flex-medium="100" md-flex-small="100" md-flex-xsmall="100">
                       <md-button md-theme="default" class="md-raised md-accent round-button" type="submit">Login</md-button>
                    </md-layout>
                </md-card-actions>
                <!-- message -->
                <md-snackbar md-position="top center" :class="error"  
                    ref="snackbarFailed" md-duration="3000">
                    <span>{{ response }}</span>
                    <md-button md-button-icon class="md-accent" md-theme="default" 
                        @click="$refs.snackbarFailed.close()">
                        <md-icon>clear</md-icon>
                    </md-button>
                </md-snackbar>
                  <md-snackbar md-them="default" class="success" 
                      md-position="top center" ref="snackbarSuccess" md-duration="3000">
                       <span>{{ response }}</span>
                      </md-snackbar>
            </md-layout>
        </md-layout>
    </md-layout>
  </div>
</template>

<script>
import { HTTP2 } from '@/http/http-common'

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      delayMillis: 1000,
      interval: {},
      value: 0,
      loading: false,
      response: '',
      success: '',
      error: '',
      alert: true
    }
  },
  methods: {
    checkCred () {
      const {
        username,
        password
      } = this
      if (this.username === '' || this.password === '') return
      this.toggleLoading()
      this.resetResponse()
      this.resetSuccess()
      this.resetError()
      this.$store.commit('TOGGLE_LOADING')
      HTTP2.post('/users/login', {
        username,
        password
      }, null)
          .then(response => {
            var data = response.data
            /* Checking if error object was returned from the server */
            if (data.status === 500) {
              var errorName = data.data
              if (errorName) {
                this.response = errorName === 'InvalidCredentialsError' ? 'Username/Password incorrect. Please try again.' : errorName
              } else {
                this.response = data.data
              }
              return
            }
            /* Setting user in the state and caching record to the localStorage */
            if (data.data.user) {
              var token = 'Bearer ' + data.data.access_token
              this.$store.commit('SET_USER', data.data.user.info)
              this.$store.commit('SET_TOKEN', token)
              this.$store.commit('SET_ROLES', data.data.user.roles)
              this.$store.commit('SET_PERMISSIONS', data.data.user.perms)
              if (window.localStorage) {
                window.localStorage.setItem('user', JSON.stringify(data.data.user.info))
                window.localStorage.setItem('token', token)
                window.localStorage.setItem('permissions', JSON.stringify(data.data.user.perms))
                window.localStorage.setItem('roles', JSON.stringify(data.data.user.roles))
              }
              this.response = 'Your login was successful'
              this.success = 'success'
              this.openSuccess()
              this.delayLoader(25)
            }
          })
          .catch(error => {
            this.$store.commit('TOGGLE_LOADING')
            console.log(error)
            this.response = 'Username/Password incorrect. Please try again.'
            this.error = 'error'
            this.openFailed()
          })
    },
    openSuccess () {
      this.$refs.snackbarSuccess.open()
    },
    openFailed () {
      this.$refs.snackbarFailed.open()
    },
    toggleLoading () {
      this.loading = !this.loading
    },
    resetResponse () {
      this.response = ''
      this.value = 0
    },
    resetSuccess () {
      this.success = ''
    },
    resetError () {
      this.error = ''
    },
    delayLoader (number) {
      this.interval = setInterval(() => {
        if (this.value === number) {
          if (this.error !== '') {
            clearInterval(this.interval)
            this.toggleLoading()
            this.resetResponse()
            this.resetError()
          } else if (this.success !== '') {
            clearInterval(this.interval)
            this.toggleLoading()
            this.resetResponse()
            this.resetSuccess()
            this.$router.push('/')
          }
        }
        this.value += number
      }, this.delayMillis)
    }
  }
}
</script>
  
<style lang="scss">
.error {
    color: #fff;
    background-color: orangered;
}
.marginal {
  margin: 10%;
}
</style>