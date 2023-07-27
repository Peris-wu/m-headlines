<!--  -->
<template>
  <div class="channel-list">
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      :success-text="successText"
      :success-duration="1000"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <article-item
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import articleItem from '@/components/articleItem'
import { getUserChannelById } from '@/api/user'
export default {
  name: 'ChannelListView',
  props: {
    channel: {
      type: Object,
      default: null,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      timestamp: null,
      successText: ''
    }
  },
  methods: {
    async onLoad() {
      try {
        if (this.refreshing) {
          this.timestamp = null
        }
        const params = {
          channel_id: this.channel.id,
          timestamp: this.timestamp || +new Date()
        }
        const { data } = await getUserChannelById(params)

        const results = data.data.results
        if (this.refreshing) {
          this.refreshing = false
          this.list = [...results, ...this.list]
          this.successText = `更新了${results.length}条数据`
        } else {
          this.list = [...this.list, ...results]
          this.timestamp = data.data.pre_timestamp
          this.loading = false
          if (data.data.results.length === 0 || data.data.results.length < 10) {
            this.finished = true
          }
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
    }
  },
  components: {
    articleItem
  }
}
</script>
<style lang="scss" scoped>
.channel-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 90px;
  bottom: 50px;
  overflow-y: auto;
}
</style>
