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
            @click="toSearchPage"
          >
            <span class="test">搜索</span>
          </van-button>
        </template>
      </van-nav-bar>
    </div>
    <div class="main">
      <van-tabs
        v-model="tabsActive"
        @click="fn"
        :border="true"
        class="ps-van-tabs"
        line-width="15"
      >
        <van-tab
          :key="channel.id"
          v-for="channel in userChannels"
          :title="channel.name"
          :name="channel.id"
        >
          <channel-list :channel="channel" />
        </van-tab>
        <div slot="nav-right" style="width: 40px; flex-shrink: 0"></div>
      </van-tabs>
      <div class="menuBtn">
        <van-icon name="wap-nav" @click="showPopPup" />
      </div>
    </div>

    <!--  Popup -->
    <van-popup
      closeable
      close-icon-position="top-left"
      round
      :overlay="false"
      v-model="popPup"
      position="bottom"
      get-container="body"
      class="popPup"
    >
      <edit-channel
        :userChannels="userChannels"
        :recommendChannels="recommendChannels"
        :tabsActive="tabsActive"
        @deleteChannel="deleteChannel"
        @selectChannel="selectChannel"
        @addChannel="addChannel"
      ></edit-channel>
    </van-popup>
  </div>
</template>

<script>
import channelList from '@/views/home/components/channel-list'
import editChannel from '@/views/home/components/edit-channel'
import { mapState } from 'vuex'
import {
  getUserChannels,
  setUserChannelById,
  deleteUserChannelById
} from '@/api/user'
import { getAllChannels } from '@/api/channel'
import { getItem, setItem } from '@/utils/handleStorage'
import { USER_CHANNEL_KEY } from '@/config/user'
export default {
  name: 'HomeView',
  data() {
    return {
      userChannels: [],
      allChannels: [],
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      defaultChannel: 0,
      popPup: false,
      tabsActive: 0
    }
  },
  components: {
    channelList,
    editChannel
  },
  computed: {
    ...mapState(['user']),
    recommendChannels() {
      return this.allChannels.filter((channel) => {
        return !this.userChannels.find((userChannel) => {
          return userChannel.id === channel.id
        })
      })
    }
  },
  methods: {
    fn(val, a) {
      console.log(val, a)
    },
    async deleteChannel(id) {
      const index = this.userChannels.findIndex(
        (channel) => channel.id === Number(id)
      )
      this.userChannels.splice(index, 1)
      if (!this.user) {
        setItem(USER_CHANNEL_KEY, this.userChannels)
      } else {
        await deleteUserChannelById(Number(id))
      }
    },
    selectChannel(index) {
      if (!index) return
      this.tabsActive = Number(index)
      this.popPup = false
    },
    toSearchPage() {
      this.$router.push({
        name: 'search'
      })
    },
    async addChannel(id) {
      const index = this.allChannels.findIndex(
        (channel) => channel.id === Number(id)
      )
      const deepVal = this.$_.cloneDeep(this.allChannels[index])
      this.userChannels.push(deepVal)
      if (!this.user) {
        // localStorage save
        setItem(USER_CHANNEL_KEY, this.userChannels)
      } else {
        // sql save
        await setUserChannelById({
          channels: [
            {
              id: Number(id),
              seq: this.userChannels.length
            }
          ]
        })
      }
    },
    showPopPup() {
      this.popPup = true
    },
    async initUserChannels() {
      try {
        const { data } = await getUserChannels()
        this.userChannels = data.data.channels
        if (!this.user) {
          setItem(USER_CHANNEL_KEY, this.userChannels)
        }
      } catch (err) {
        console.log(err)
      }
    },
    async initAllChannels() {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    }
  },
  mounted() {
    // init all channels
    this.initAllChannels()
    if (this.user) {
      // init user channels
      this.initUserChannels()
    } else {
      if (getItem(USER_CHANNEL_KEY)) {
        this.userChannels = getItem(USER_CHANNEL_KEY)
      } else {
        this.initUserChannels()
      }
    }

    // 开启keep-alive缓存
    // this.$store.commit('addCachePage', ['LayoutView'])
    this.$store.commit('addCachePage', [
      'LayoutView',
      'questionAnswerView',
      'videoView',
      'myView'
    ])
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
    position: relative;
    .menuBtn {
      position: absolute;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 40px;
      height: 40px;
      top: 50%;
      transform: translateY(-50%);
      right: 0;
      font-size: 30px;
      z-index: 99;
      background-color: rgba(255, 255, 255, 0.9);
    }
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
