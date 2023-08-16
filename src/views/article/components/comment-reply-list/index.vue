<!--  -->
<template>
  <div class="comment-reply-list">
    <div class="header">
      <van-nav-bar :title="`${replyComment.reply_count}条回复`">
        <van-icon @click="close" slot="left" name="cross" color="#1989fa" />
      </van-nav-bar>
    </div>
    <div class="main">
      <!-- comment of reply  -->
      <comment-item :comment="replyComment"></comment-item>
      <!-- all reply and all comment -->
      <van-cell title="所有回复" />
      <van-cell title="全部评论" />
      <div class="all-reply">
        <comment-list
          :articleId="replyComment.com_id"
          :commentList="commentList"
          type="'c'"
          @handleCommentList="handleCommentList"
          @replyComment="handleReplyComment"
        ></comment-list>
      </div>
    </div>
    <div class="footer">
      <div class="comment-btn" @click="showCommentContainer">
        <van-button round block size="small">写评论</van-button>
      </div>
    </div>
    <van-popup
      v-model="showCommentField"
      position="bottom"
      @click-overlay="initData"
    >
      <div class="popup-comment">
        <van-field
          v-model="message"
          rows="3"
          show-word-limit
          :autosize="{ maxHeight: 72 }"
          type="textarea"
          placeholder="请输入留言"
          maxlength="100"
          autofocus
        />
        <van-button class="btn" size="small" type="info" @click="publicComment">
          发布
        </van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import CommentItem from '@/views/article/components/comment-item'
import CommentList from '@/views/article/components/comment-list'
import { commentByArticleId } from '@/api/comment'
export default {
  name: 'CommentReplyList',
  props: {
    replyComment: {
      type: Object,
      required: true
    },
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data() {
    return {
      commentList: [],
      showCommentField: false,
      message: '',
      isClickReply: false,
      commentInfo: {}
    }
  },
  methods: {
    fn() {
      console.log(123)
    },
    initData() {
      console.log(123)
      this.isClickReply = false
      this.commentInfo = {}
    },
    handleReplyComment(comment) {
      this.showCommentField = true
      this.commentInfo = comment
      this.isClickReply = true
      console.log(comment)
    },
    async publicComment() {
      const params = {
        articleId: this.replyComment.com_id,
        content: this.message,
        commenterId: this.articleId
      }
      if (this.isClickReply) {
        // params.content = aut_name  content
        params.content = `${this.message}//@${this.commentInfo.aut_name}:${this.commentInfo.content}`
      }
      const { data } = await commentByArticleId(params)
      this.commentList.unshift(data.data.new_obj)
      this.initData()
      this.$emit('updateReplyCount', this.replyComment.com_id)
      this.message = ''
      this.showCommentField = false
    },
    showCommentContainer() {
      this.showCommentField = true
    },
    handleCommentList({ data }) {
      this.commentList = [...this.commentList, ...data]
    },
    close() {
      this.$emit('close')
    }
  },
  components: {
    CommentItem,
    CommentList
  },
  mounted() {
    console.log(this.replyComment)
    console.log(this.articleId)
  }
}
</script>
<style lang="scss" scoped>
.comment-reply-list {
  .header {
    ::v-deep .van-nav-bar__content {
      background-color: #ffffff;
    }
    ::v-deep .van-nav-bar__title {
      color: #323233;
    }
  }
  .main {
    position: fixed;
    top: 46px;
    bottom: 45px;
    left: 0;
    right: 0;
    padding: 14px;
    overflow-y: scroll;
    .van-cell {
      padding-left: 0;
      padding-right: 0;
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 44px;
    background-color: #ffffff;
    padding: 0 14px;
    border-top: 1px solid #cccccc71;
    .comment-btn {
      width: 100%;
    }
  }
  .popup-comment {
    display: flex;
    align-items: center;
    .btn {
      width: 50px;
      margin-right: 20px;
    }
  }
}
</style>
