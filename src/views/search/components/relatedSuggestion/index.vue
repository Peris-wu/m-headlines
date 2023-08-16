<!--  -->
<template>
  <div class="related-suggestion" @click="suggestionEventProxy">
    <van-cell
      v-for="suggestion in highlightWordOfList"
      :key="suggestion.id"
      icon="search"
    >
      <template slot="title">
        <div
          :data-id="suggestion.id"
          @click="selectSuggestion"
          v-if="suggestion.title"
          v-html="suggestion.title"
        ></div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'RelatedSuggestion',
  props: {
    searchValue: {
      type: String,
      required: true
    },
    relatedSuggestionsList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      // relatedSuggestionsList: [
      //   {
      //     id: 1,
      //     title: 'b'
      //   },
      //   {
      //     id: 2,
      //     title: 'bi'
      //   },
      //   {
      //     id: 3,
      //     title: 'bilib'
      //   },
      //   {
      //     id: 4,
      //     title: 'bilibi'
      //   },
      //   {
      //     id: 5,
      //     title: 'ban'
      //   }
      // ]
    }
  },
  computed: {
    highlightWordOfList() {
      const regExp = new RegExp(`[${this.searchValue}]`, 'g')
      const renderArr = []
      for (let i = 0; i < this.relatedSuggestionsList.length; i++) {
        if (this.relatedSuggestionsList[i].title) {
          renderArr.push({
            ...this.relatedSuggestionsList[i],
            title: this.relatedSuggestionsList[i].title?.replace(
              regExp,
              (pattern) => {
                return `<span style="color:red">${pattern}</span>`
              }
            )
          })
        }
      }
      return renderArr
    }
  },
  methods: {
    suggestionEventProxy(e) {
      this.$emit('selectSuggestion', Number(e.target.dataset.id))
    },
    selectSuggestion() {}
  },
  components: {}
}
</script>
<style lang="scss" scoped></style>
