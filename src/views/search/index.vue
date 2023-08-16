<!--  -->
<template>
  <div class="search">
    <van-search
      show-action
      v-model="searchValue"
      background="#3296fa"
      placeholder="请输入搜索关键词"
      class="cancel-button"
      @search="search"
      @focus="focus"
      @input="input"
    >
      <div slot="action" @click="cancelSearch">取消</div>
    </van-search>
    <div class="search-main">
      <!-- 搜索结果 -->
      <search-result
        v-if="searchResult"
        :searchValue="searchValue"
      ></search-result>

      <!-- 关键字相关结果 -->
      <related-suggestion
        v-else-if="searchValue"
        :searchValue="searchValue"
        :relatedSuggestionsList="relatedSuggestionsList"
        @selectSuggestion="selectSuggestion"
      />

      <!-- 历史 -->
      <history-records
        :historyRecords="historyRecords"
        @handleHistoryRecordOperate="handleHistoryRecordOperate"
        @allDeleteHistoryRecords="allDeleteHistoryRecords"
        v-else
      ></history-records>
    </div>
  </div>
</template>

<script>
import relatedSuggestion from '@/views/search/components/relatedSuggestion'
import historyRecords from '@/views/search/components/historyRecords'
import searchResult from '@/views/search/components/searchResult'
import { searchSuggestions } from '@/api/search'
import { SEARCH_KEY } from '@/config/history'
import { getItem, setItem } from '@/utils/handleStorage'
import { Dialog } from 'vant'
import { mapState } from 'vuex'
// import { getUserSearchHistory } from '@/api/user'
export default {
  name: 'SearchView',
  data() {
    return {
      searchValue: '',
      searchResult: false,
      relatedSuggestionsList: [],
      historyRecords: [],
      input: this.$_.debounce(() => {
        this.getRelatedSuggestion()
      }, 500)
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    search() {
      this.searchResult = true
      this.handleHistoryRecords(this.searchValue)
    },
    focus() {
      this.searchResult = false
    },
    handleHistoryRecordOperate(info) {
      console.log(info.index)
      if (!Number.isNaN(info.index)) {
        const deleteItem = this.historyRecords.splice(info.index, 1)
        if (info.operate === 'select') {
          this.searchValue = deleteItem[0]
          this.searchResult = true
          this.historyRecords = [...deleteItem, ...this.historyRecords]
        }
        setItem(SEARCH_KEY, this.historyRecords)
      }
    },
    allDeleteHistoryRecords() {
      Dialog.confirm({
        message: '是否清空搜索历史?'
      })
        .then(() => {
          // on confirm
          this.historyRecords = []
          setItem(SEARCH_KEY, this.historyRecords)
        })
        .catch(() => {
          // on cancel
        })
    },
    handleHistoryRecords(historyTitle) {
      const index = this.historyRecords.findIndex(
        (item) => item === historyTitle
      )
      if (index === -1) {
        this.historyRecords.unshift(historyTitle)
      } else {
        this.historyRecords = [
          ...this.historyRecords.splice(index, 1),
          ...this.historyRecords
        ]
      }
      setItem(SEARCH_KEY, this.historyRecords)
    },
    selectSuggestion(id) {
      if (!Number.isNaN(id) && typeof id === 'number') {
        const { title } = this.relatedSuggestionsList.find(
          (suggestion) => suggestion.id === id
        )
        this.searchValue = title
        this.handleHistoryRecords(title)
        this.searchResult = true
      }
    },
    cancelSearch() {
      this.$router.back()
    },
    async getRelatedSuggestion() {
      try {
        if (!this.searchValue) return
        const { data } = await searchSuggestions(this.searchValue)
        this.relatedSuggestionsList = data.data.options.map((item, index) => {
          return {
            id: index,
            title: item
          }
        })
      } catch (err) {
        console.log(err)
      }
    },
    async handleHistoryRecordInfo() {
      try {
        // if (this.user) {
        //   const { data } = await getUserSearchHistory()
        //   console.log(data)
        // }
        this.historyRecords = getItem(SEARCH_KEY) || []
      } catch (err) {
        console.log(err)
      }
      // this.historyRecords = []
    }
  },
  mounted() {
    this.handleHistoryRecordInfo()
  },
  components: {
    relatedSuggestion,
    historyRecords,
    searchResult
  }
}
</script>
<style lang="scss" scoped>
.search {
  .van-search__action {
    color: #ffffff;
  }
  .cancel-button {
    ::v-deep .van-search__action {
      &:active {
        background-color: inherit;
      }
    }
  }
  .search-main {
    position: fixed;
    top: 54px;
    bottom: 0;
    left: 0;
    right: 0;
    // background-color: red;
  }
}
</style>
