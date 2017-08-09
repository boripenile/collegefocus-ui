<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.image-toolbar {
    height: 48px;
    width: 48px;
}
.marginal {
    margin: 5%;
}
.image-center {
    margin: 0 auto;
    height: 90px;
    width: 90px;
}
.page-header {
    text-align: center;
}
.card-container {
     padding: 20px;
 }
 .round-button {
    border-radius: 25px;
    width: 100%;
    height: 42px;
    font-weight: 700;
  }
</style>
