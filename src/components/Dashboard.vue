<template>
  <v-app id="Dashboard">
    <div class="container">
        <md-sidenav class="main-sidebar md-left md-fixed" md-swipeable ref="main-sidebar">
            <md-toolbar class="vue-material-logo" md-theme="white">
                <router-link exact to="/">
                    <img :src="logo" alt="College">
                    <span>College Focus</span>
                </router-link>
            </md-toolbar>
    
            <div class="main-sidebar-links">
                <md-list class="md-dense">
                    <md-list-item>
                        <router-link exact to="/">Menus</router-link>
                    </md-list-item>
    
                    <md-list-item v-for="(item, i) in items" :key="i" :md-expand-multiple="item.model">
                        <md-icon>{{ item.icon }}</md-icon>
                        <span>{{ item.title }}</span>
                        <md-list-expand v-if="item.model">
    
                            <md-list v-if="item.children.length > 0">
                                <md-list-item v-for="(child, j) in item.children" :key="j" class="md-inset">
                                    <router-link :to="navigate(child)" @click.native.prevent="closeSidenav()">
                                        <md-icon>{{ child.icon }}</md-icon>
                                        <span>{{ child.title }}</span>
                                    </router-link>
                                </md-list-item>
                            </md-list>
                        </md-list-expand>
                    </md-list-item>
                </md-list>
            </div>
        </md-sidenav>
        <md-toolbar>
            <md-button class="md-icon-button md-hide-large-and-up" 
                @click="toggleSidenav">
            <md-icon>menu</md-icon>
            </md-button>
            <img src="../assets/collegefocus_60.png" class="image-toolbar" alt="college"/>
            <span class="md-title">{{ title }}</span>
        </md-toolbar>
        <app-content :subtitle="subtitle"></app-content>
    </div>
  </v-app>
</template>

<script>
// import Vue from 'vue'
import AppContent from '@/components/layouts/Content.vue'
import Menus from '../../config/menus'

export default {
  name: 'Dashboard',
  data () {
    return {
      title: 'Dashboard',
      subtitle: null,
      items: Menus,
      option: false,
      message: '',
      newColor: '',
      selected: {
        id: 0,
        icon: 'supervisor_account',
        title: 'Manage Roles',
        to: '/roles',
        role: 'superadmin',
        permission: 'role:view'
      }
    }
  },
  components: {
    AppContent
  },
  computed: {
    logo () {
    //  let theme = Vue.material.currentTheme
    //   if (theme) {
    //     return `assets/logo-vue-material-${theme}.png`
    //   }
      return 'src/assets/logo.png'
    }
  },
  methods: {
    toggleSidenav () {
      this.$refs['main-sidebar'].toggle()
    },
    closeSidenav () {
      this.$refs['main-sidebar'].close()
    },
    navigate (item) {
      this.selected = item
      return this.selected.to
    },
    selectedColor () {
      if (this.selected !== null) {
        console.log('I am here now...')
        this.newColor = 'yellow'
        console.log(this.newColor)
      }
    },
    alert (data) {
      window.alert(data)
    }
  },
  mounted () {
    this.selectedColor()
  }
}
</script>

<style lang="scss">
$sizebar-size: 280px;
html,
body {
    margin: 0;
    height: 100%;
    overflow: hidden;
}

.container {
    min-height: 100%;
    display: flex;
    flex-flow: column nowrap;
    flex: 1;
    @media (min-width: 1281px) {
        padding-left: $sizebar-size;
    }
}

.main-sidebar.md-sidenav {
    .md-sidenav-content {
        width: $sizebar-size;
        display: flex;
        flex-flow: column;
        overflow: hidden;
        @media (min-width: 1281px) {
            top: 0;
            pointer-events: auto;
            transform: translate3d(0, 0, 0) !important;
        }
    }
    .md-backdrop {
        @media (min-width: 1281px) {
            opacity: 0;
            pointer-events: none;
        }
    }
    .md-toolbar {
        min-height: 172px;
        border-bottom: 1px solid rgba(#000, .12);
    }
    .vue-material-logo {
        font-size: 24px;
        a {
            width: 100%;
            display: flex;
            flex-flow: column;
            justify-content: center;
            align-items: center;
            color: inherit;
            text-decoration: none;
            &:hover {
                color: inherit;
                text-decoration: none;
            }
        }
        img {
            width: 160px;
            margin-bottom: 16px;
        }
    }
    .main-sidebar-links {
        overflow: auto;
        flex: 1;
        .md-inset .md-list-item-container {
            padding-left: 36px;
        }
        .md-list-item-container {
            font-size: 14px;
            font-weight: 500;
        }
    }
}
</style>
