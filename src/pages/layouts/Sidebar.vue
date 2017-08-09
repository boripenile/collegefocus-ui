<template>
 <div class="container">
  <md-sidenav class="main-sidebar md-left md-fixed" md-swipeable ref="main-sidebar">
      <md-toolbar class="vue-material-logo" md-theme="white">
        <router-link exact to="/">
          <img :src="logo" alt="Vue">
          <span>Vue Material</span>
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
              <md-list-item v-for="(child, j) in item.children" 
                :key="j" class="md-inset">
                <router-link :to="navigate(child)" :style="{ background: newColor }">
                <md-icon>{{ child.icon }}</md-icon>
                <span>{{ child.title }}</span>
                </router-link>
              </md-list-item>
          </md-list>
          </md-list-expand>
      </md-list-item>
        </md-list>  
      </div>

      <release-version></release-version>
    </md-sidenav>

    <transition name="md-router" appear>
      <router-view></router-view>
    </transition>
</div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      option: false,
      message: '',
      newColor: '',
      toolbar: false,
      selected: {
        id: 0,
        icon: 'supervisor_account',
        title: 'Manage Roles',
        to: '/roles',
        role: 'superadmin',
        permission: 'role:view'
      },
      items: [
        {
          id: 1,
          icon: 'build',
          title: 'System Setting',
          model: true,
          role: 'superadmin',
          permission: 'role:view',
          children: [
            {
              id: 1,
              icon: 'supervisor_account',
              title: 'Manage Roles',
              to: '/roles',
              role: 'superadmin',
              permission: 'role:view',
              selected: false
            },
            {
              id: 2,
              icon: 'perm_identity',
              title: 'Manage Permissions',
              to: '/permissions',
              role: 'superadmin',
              permission: 'permission:view',
              selected: false
            }
          ]
        },
        {
          id: 2,
          icon: 'group',
          title: 'Manage Administrators',
          model: false,
          role: 'superadmin',
          permission: 'role:view',
          children: []
        }
      ]
    }
  },
  methods: {
    toggleLeftSidenav () {
      this.$refs['main-sidebar'].toggle()
    },
    toggleRightSidenav () {
      this.$refs.rightSidenav.toggle()
    },
    closeRightSidenav () {
      this.$refs.rightSidenav.close()
    },
    open (ref) {
      console.log('Opened: ' + ref)
    },
    close (ref) {
      console.log('Closed: ' + ref)
    },
    toggleOption () {
      if (this.option === false) {
        this.option = true
        this.message = 'Murtadha Ali'
      } else {
        this.option = false
        this.message = ''
      }
    },
    navigate (item) {
      this.selected = item
      // this.selectedColor()
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .nagivated {
    background: yellow
  }
  $sizebar-size: 280px;
  html,
  body {
    height: 100%;
    overflow: hidden;
  }
  body {
    display: flex;
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
