<!--  -->
<template>
  <div class="layout">
    <keep-alive :include="cachePage">
      <router-view></router-view>
    </keep-alive>
    <van-tabbar
      v-model="$store.state.tabBarActive"
      :before-change="beforeChange"
    >
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="comment-o">问答</van-tabbar-item>
      <van-tabbar-item icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import { Dialog } from 'vant'
const _routerMap = {
  home: 0,
  question: 1,
  video: 2,
  my: 3
}
export default {
  name: 'LayoutView',
  data() {
    return {}
  },
  watch: {
    $route: {
      handler(to, oldRoute) {
        if (_routerMap[to.name]) {
          this.active = _routerMap[to.name]
        }
      },
      immediate: true
    }
  },
  methods: {
    beforeChange(val) {
      const routerMap = {
        0: 'home',
        1: 'questionAnswer',
        2: 'video',
        3: 'my'
      }
      this.$router.push({ name: routerMap[val] })
      if (val !== this.$store.state.tabBarActive) {
        return false
      }
      return true
    }
  },
  computed: {
    ...mapState(['cachePage', 'user'])
  },
  components: {},
  mounted() {}
}
</script>
<style lang="scss" scoped></style>
