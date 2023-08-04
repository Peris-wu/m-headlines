<!--  -->
<template>
  <div class="layout">
    <router-view></router-view>
    <van-tabbar v-model="active" @change="change">
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
  name: 'LayoutView',
  data() {
    return {
      active: 0
    }
  },
  watch: {
    $route: {
      handler(to) {
        if (_routerMap[to.name]) {
          this.active = _routerMap[to.name]
        }
      },
      immediate: true
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
  },
  components: {}
}
</script>
<style lang="scss" scoped></style>
