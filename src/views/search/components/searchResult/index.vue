<!--  -->
<template>
  <div class="search-results">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.art_id" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { searchResult } from '@/api/search'
export default {
  name: 'SearchResults',
  props: {
    searchValue: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      finished: false,
      list: [],
      page: 0,
      perPage: 10
    }
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      try {
        this.page++
        const { data } = await searchResult({
          page: this.page,
          per_page: this.perPage,
          q: this.searchValue
        })
        this.list = [...this.list, ...data.data.results]
        // load all the results
        if (this.list.length >= data.data.total_count) {
          this.finished = true
        }
        this.loading = false
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    }
  },
  components: {}
}
</script>
<style lang="scss" scoped>
.search-results {
  height: 100%;
  overflow-y: auto;
}
</style>
