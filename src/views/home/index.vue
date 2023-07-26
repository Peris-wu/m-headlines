<!--  -->
<template>
  <div class="box">
    <div class="header">
      <van-nav-bar class="nav-bar">
        <template #title>
          <van-button
            active-class=""
            class="search-btn"
            block
            round
            icon="search"
          >
            <span class="test">搜索</span>
          </van-button>
        </template>
      </van-nav-bar>
    </div>
    <div class="main">
      <van-tabs @click="fn" :border="true" class="ps-van-tabs" line-width="15">
        <van-tab
          :key="channel.id"
          v-for="channel in userChannels"
          :title="channel.name"
          :name="channel.id"
        >
          <channel-list :channel="channel" />
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import channelList from '@/views/home/components/channel-list'
import { getUserChannels, getUserChannelById } from '@/api/user'
export default {
  name: 'HomeView',
  data() {
    return {
      userChannels: [],
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      defaultChannel: 0
    }
  },
  components: {
    channelList
  },
  computed: {
    // ...mapState(['user'])
  },
  methods: {
    fn(val, a) {
      console.log(val, a)
    },
    async onLoad() {
      try {
        const params = {
          channel_id: this.defaultChannel,
          timestamp: +new Date()
        }
        const { data } = await getUserChannelById(params)
        if (this.refreshing) {
          this.list = []
          this.refreshing = false
        }
        this.list = [...this.list, ...data.data.results]
        this.loading = false
        if (data.data.results.length < 10 || data.data.results.length === 0) {
          this.finished = true
        }
      } catch (err) {
        //
        console.log(err)
      }
    },
    onRefresh() {
      // 清空列表数据

      this.finished = false
      this.onLoad()
    },
    async initUserChannels() {
      try {
        const { data } = await getUserChannels()
        this.userChannels = data.data.channels
        console.log(this.userChannels)
      } catch (err) {
        console.log(err)
      }
    }
  },
  mounted() {
    // this.onLoad()
    this.initUserChannels()
    // if (this.user !== null) {
    // }
  }
}
</script>
<style lang="scss" scoped>
.box {
  .header {
    .nav-bar {
      ::v-deep .van-nav-bar__title {
        max-width: none;
      }
    }
    .search-btn {
      width: 277px;
      height: 32px;
      color: #ffffff;
      background-color: #5babfb;
      border: none;
      .van-icon-search {
        font-size: 16px;
      }
      .van-button__text {
        font-size: 14px;
      }
    }
  }
  .main {
    .ps-van-tabs {
      ::v-deep .van-tabs__wrap {
        border-bottom: 1px solid #f0f0f1;
      }
      ::v-deep .van-tab {
        border-right: 1px solid #f0f0f1;
      }
      ::v-deep .van-tabs__line {
        background-color: #3296fa;
        bottom: 20px;
      }
      ::v-deep .van-tabs__nav--line.van-tabs__nav--complete {
        padding-left: 0;
        padding-right: 0;
      }
    }
  }
}
</style>
