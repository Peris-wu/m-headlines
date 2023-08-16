<template>
  <div class="comment-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <comment-item
        v-for="(comment, index) in commentList"
        :key="index"
        :comment="comment"
        @upvote="upvote"
        @replyComment="replyComment"
      ></comment-item>
    </van-list>
  </div>
</template>

<script>
import CommentItem from '@/views/article/components/comment-item'
import { getCommentByArtId } from '@/api/articles'
export default {
  name: 'CommentList',
  props: {
    articleId: {
      type: String,
      required: true
    },
    commentList: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      default: 'a'
    }
  },
  data() {
    return {
      loading: false,
      finished: false,
      offset: null,
      value: ''
    }
  },
  methods: {
    replyComment(comment) {
      this.$emit('replyComment', comment)
    },
    async onLoad() {
      const params = {
        type: this.type,
        source: this.articleId,
        offset: this.offset,
        limit: 10
      }
      const { data } = await getCommentByArtId(params)
      this.$emit('handleCommentList', {
        data: data.data.results,
        totalCount: data.data.total_count
      })
      this.loading = false
      this.offset = data.data.last_id
      if (this.commentList.length >= data.data.total_count) {
        this.finished = true
      }
    },
    async upvote(id) {
      this.$emit('handleUpvote', id)
    }
  },
  components: {
    CommentItem
  },
  mounted() {}
}
</script>
<style lang="scss" scoped>
.comment-list {
  background-color: #ffffff;
  margin-top: 20px;
}
</style>
