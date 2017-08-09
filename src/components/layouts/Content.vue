<template>
  <md-layout md-column md-gutter>
    <md-layout>
        <span class="md-title">{{ subtitle }}</span>
    </md-layout>
    <md-layout>
        <transition name="md-router" mode="out-in" appear>
            <router-view></router-view>
        </transition>
    </md-layout>
  </md-layout>
</template>

<script>
export default {
  name: 'Content',
  props: ['subtitle'],
  data () {
    return {
    }
  }
}
</script>
