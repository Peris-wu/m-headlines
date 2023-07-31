<!--  -->
<template>
  <div class="edit-channel">
    <van-cell center :border="false">
      <div slot="title" class="channel-title">我的频道</div>
      <van-button
        @click="edit"
        round
        size="mini"
        plain
        type="danger"
        class="paddingLR"
        >{{ isShowCloseIcon ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid
      :border="false"
      :gutter="10"
      class="channel-grid"
      @click.native="editEventProxy"
    >
      <van-grid-item v-for="channel in userChannels" :key="channel.id">
        <div class="text">
          <div
            :data-id="channel.id"
            :style="{ color: channel.id === tabsActive ? 'red' : '#333333' }"
          >
            {{ channel.name }}
          </div>
          <van-icon
            :data-id="channel.id"
            v-if="isShowCloseIcon && channel.id !== 0"
            name="close"
            class="close-icon"
          />
        </div>
      </van-grid-item>
    </van-grid>

    <!--  推荐 -->
    <van-cell center :border="false">
      <div slot="title" class="channel-title">频道推荐</div>
    </van-cell>
    <van-grid
      :border="false"
      :gutter="10"
      class="channel-grid"
      @click.native="introduceEventProxy"
    >
      <van-grid-item v-for="channel in recommendChannels" :key="channel.id">
        <div class="text" :data-id="channel.id">
          {{ channel.name }}
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  name: 'EditChannel',
  props: {
    tabsActive: {
      type: Number,
      required: true
    },
    userChannels: {
      type: Array,
      required: true
    },
    recommendChannels: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isShowCloseIcon: false
    }
  },
  methods: {
    editEventProxy(e) {
      if (e.target.tagName === 'I') {
        // $emit to delete the channel by index
        this.$emit('deleteChannel', e.target.dataset.id)
      }
      if (e.target.tagName === 'DIV') {
        this.$emit('selectChannel', e.target.dataset.id)
      }
    },
    introduceEventProxy(e) {
      this.$emit('addChannel', e.target.dataset.id)
    },
    edit() {
      this.isShowCloseIcon = !this.isShowCloseIcon
    }
  },
  components: {}
}
</script>
<style lang="scss" scoped>
.edit-channel {
  padding-top: 54px;
  .channel-title {
    font-size: 16px;
    color: #333333;
  }
  .paddingLR {
    padding: 0 10px;
  }
  .channel-grid {
    .close-icon {
      position: relative;
      right: -35px;
      top: -15px;
      z-index: 100;
    }
    .text {
      position: relative;
      text-align: center;
      line-height: 43px;
      width: 80px;
      height: 43px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      .close-icon {
        position: absolute;
        right: 0;
        top: 0;
        color: #333333;
      }
      // -webkit-line-clamp: 1;
      // -webkit-box-orient: vertical;
      // overflow: hidden;
      // text-overflow: ellipsis;
      // white-space: nowrap;
    }
    ::v-deep .van-grid-item__content {
      width: 80px;
      height: 43px;
      background-color: #f4f5f6;
      font-size: 14px;
      padding: 0;
    }
  }
}
</style>
