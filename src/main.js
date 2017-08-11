// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import AppView from './components/App.vue'
import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import VueResource from 'vue-resource'
import VueApiRequest from 'vue-api-request'
import { sync } from 'vuex-router-sync'
import routes from './routes'
import store from './store'

Vue.use(VueApiRequest)
Vue.use(VueMaterial)
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.config.productionTip = false

Vue.material.registerTheme({
  college: {
    primary: 'teal'
  },
  white: {
    primary: 'white'
  },
  login: {
    background: 'assets/login-register.jpg'
  }
})

Vue.material.setCurrentTheme('college')
/* eslint-disable no-new */
// Routing logic
var router = new VueRouter({
  routes: routes,
  mode: 'history',
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})

// Some middleware to help us ensure the user is authenticated.
router.beforeEach((to, from, next) => {
  next()
  // window.console.log('Transition', transition)
  // var token = store.state.token

  // if (to.name === 'SchoolRegistration') {
  //   next()
  // } else if (token === null || token === 'undefined') {
  //   if (to.name === 'Login') {
  //     next()
  //   } else {
  //     next({
  //       path: '/login',
  //       query: {redirect: to.fullPath}
  //     })
  //   }
  // } else {
  //   if (to.name === 'Login') {
  //     next({
  //       path: '/',
  //       query: {redirect: to.fullPath}
  //     })
  //   } else {
  //     next()
  //   }
  // }
})

sync(store, router)

// Start out app!
// eslint-disable-next-line no-new
new Vue({
  el: '#root',
  router: router,
  store: store,
  render: h => h(AppView)
})

// Check local storage to handle refreshes
// if (window.localStorage) {
//   var localUserString = window.localStorage.getItem('user') || 'null'
//   var localUser = JSON.parse(localUserString)

//   if (localUser && store.state.user !== localUser) {
//     store.commit('SET_USER', localUser)
//     store.commit('SET_TOKEN', window.localStorage.getItem('token'))
//   }
// }
