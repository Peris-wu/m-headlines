<template>
  <div id="app">
    <router-view />
    <van-tabbar v-model="active" v-if="!flag" @change="change">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="comment-o">问答</van-tabbar-item>
      <van-tabbar-item icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
const _routerMap = {
  home: 0,
  question: 1,
  video: 2,
  my: 3
}
export default {
  name: 'AppView',
  data() {
    return {
      active: 0,
      flag: false
    }
  },
  watch: {
    $route(to, from) {
      // this.active = to.meta.active
      if (_routerMap[to.name]) {
        this.active = _routerMap[to.name]
      }
      if (to.name === 'login') {
        return (this.flag = true)
      }
      this.flag = false
    }
  },
  methods: {
    change(value) {
      const routerMap = {
        0: 'home',
        1: 'questionAnswer',
        2: 'video',
        3: 'my'
      }
      this.$router.push({ name: routerMap[value] })
    }
  }
}
</script>
<style lang="scss"></style>
