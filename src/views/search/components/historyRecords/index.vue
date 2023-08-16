<!--  -->
<template>
  <div class="history-records" v-if="historyRecords.length">
    <div class="history-header">
      <span class="title">搜索历史</span>
      <van-icon
        @click="showDelete"
        v-if="showDustbin"
        class="dustbin"
        name="delete-o"
      />
      <div v-else class="dustbin">
        <span @click="allDeleteHistoryRecords">全部删除</span>
        &nbsp;
        <span @click="completeDelete">完成</span>
      </div>
    </div>
    <div class="history-body" @click="eventProxy">
      <div
        class="history-item"
        :key="historyItem"
        v-for="(historyItem, index) in historyRecords"
      >
        <div :data-index="index" class="history-text">{{ historyItem }}</div>
        <van-icon
          :data-index="index"
          v-if="!showDustbin"
          name="cross"
          class="close-icon"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HistoryRecords',
  props: {
    historyRecords: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      showDustbin: true
    }
  },
  methods: {
    showDelete() {
      this.showDustbin = false
    },
    completeDelete() {
      this.showDustbin = true
    },
    allDeleteHistoryRecords() {
      this.$emit('allDeleteHistoryRecords')
    },
    eventProxy(e) {
      if (e.target.tagName === 'DIV') {
        this.$emit('handleHistoryRecordOperate', {
          operate: 'select',
          index: Number(e.target.dataset.index)
        })
      }
      if (e.target.tagName === 'I') {
        this.$emit('handleHistoryRecordOperate', {
          operate: 'delete',
          index: Number(e.target.dataset.index)
        })
      }
    }
  },
  components: {}
}
</script>
<style lang="scss" scoped>
.history-records {
  padding-top: 10px;
  // height: 100%;
  background-color: #fff;
  .history-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    .title {
      font-size: 14px;
      color: #969799;
    }
    .dustbin {
      font-size: 14px;
      color: #969799;
    }
  }
  .history-body {
    display: flex;
    flex-wrap: wrap;
    padding-top: 10px;
    .history-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      box-sizing: border-box;
      width: 50%;
      padding: 0 10px;
      font-size: 20px;
      .history-text {
        width: 100%;
        font-size: 18px;
        margin-bottom: 3px;
      }
      .close-icon {
        font-size: 18px;
      }
      &:nth-child(odd) {
        &::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 1px;
          height: 100%;
          background-color: #9c9a9a;
          transform: scale(0.5);
        }
      }
    }
  }
}
</style>
