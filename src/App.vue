<template>
  <div id="app">
    <keep-alive :include="cachePage">
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'AppView',
  data() {
    return {}
  },
  computed: {
    ...mapState(['cachePage'])
  }
}
</script>
<style lang="scss"></style>
