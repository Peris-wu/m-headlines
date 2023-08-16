<!--  -->
<template>
  <div class="article">
    <div class="header">
      <van-nav-bar left-arrow @click-left="backPrePage" />
    </div>
    <div class="contain">
      <div class="title">{{ articleInfo.title }}</div>
      <div class="base-info">
        <div class="left">
          <van-image
            round
            class="avatar"
            :src="articleInfo.aut_photo"
            fit="cover"
          />
          <div class="text-info">
            <div>{{ articleInfo.aut_name }}</div>
            <div class="update">{{ articleInfo.pubdate | timeFilter }}</div>
          </div>
        </div>
        <div class="right">
          <van-button
            block
            :icon="articleInfo.is_followed ? '' : 'plus'"
            :type="articleInfo.is_followed ? 'default' : 'info'"
            size="small"
            @click="flowEvent"
            round
            :loading="isLoading"
          >
            {{ articleInfo.is_followed ? '取消关注' : '关注' }}
          </van-button>
        </div>
      </div>
      <div
        ref="contentRef"
        class="content markdown-body"
        v-html="articleInfo.content"
      ></div>
      <!-- comment -->
      <div class="comment">
        <comment-list
          :articleId="articleId"
          :commentList="commentList"
          @handleCommentList="handleCommentList"
          @handleUpvote="handleUpvote"
          @replyComment="replyComment"
        ></comment-list>
      </div>
    </div>
    <div class="footer">
      <div class="comment-btn" @click="showCommentContainer">
        <van-button round block size="small">写评论</van-button>
      </div>
      <van-icon name="chat-o" :badge="totalCount" />
      <van-icon
        :name="articleInfo.is_collected ? 'star' : 'star-o'"
        @click="collect"
        :style="{ color: articleInfo.is_collected ? 'orange' : '' }"
      />
      <van-icon
        :name="articleInfo.attitude === 1 ? 'good-job' : 'good-job-o'"
        :style="{ color: articleInfo.attitude === 1 ? '#3296fa' : '' }"
        @click="upvote"
      />
      <van-icon name="share-o" />
    </div>
    <!-- article comment popup -->
    <van-popup v-model="showCommentField" position="bottom">
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
    <!-- article reply of comment popup -->
    <van-popup
      :style="{ height: '100%' }"
      v-model="showCommentReply"
      position="bottom"
    >
      <comment-reply-list
        v-if="showCommentReply"
        @close="close"
        :replyComment="replyCommentInfo"
        :articleId="articleId"
        @updateReplyCount="updateReplyCount"
      ></comment-reply-list>
    </van-popup>
  </div>
</template>

<script>
import { getNewDetailById } from '@/api/articles'
import { ImagePreview, Toast } from 'vant'
// import { commentUpvote, cancelCommentUpvote } from '@/api/comment'
import {
  commentUpvote,
  cancelCommentUpvote,
  commentByArticleId
} from '@/api/comment'
import {
  flowUserById,
  cancelFlowUserById,
  collectArticleById,
  cancelCollectArticleById,
  upvoteArticleById,
  cancelUpvoteArticleById
} from '@/api/user'
import CommentList from '@/views/article/components/comment-list'
import CommentReplyList from '@/views/article/components/comment-reply-list'
export default {
  name: 'ArticleView',
  props: {
    articleId: {
      type: String || Number || Object,
      required: true
    }
  },
  data() {
    return {
      articleInfo: {},
      isLoading: false,
      showCommentField: false,
      showCommentReply: false,
      message: '',
      commentId: null,
      commentList: [],
      totalCount: undefined,
      replyCommentInfo: null
    }
  },
  mounted() {
    console.log(this.articleId)
  },
  methods: {
    backPrePage() {
      this.$router.back()
    },
    updateReplyCount() {
      this.replyCommentInfo.reply_count++
    },
    close() {
      this.showCommentReply = false
    },
    replyComment(comment) {
      this.replyCommentInfo = comment
      this.showCommentReply = true
    },
    handleCommentList({ data, totalCount }) {
      this.commentList = [...this.commentList, ...data]
      if (!this.totalCount) {
        this.totalCount = totalCount
      }
    },
    async publicComment() {
      const params = {
        articleId: this.articleId,
        content: this.message,
        art_id: this.commentId
      }
      console.log(params)
      const { data } = await commentByArticleId(params)
      this.showCommentField = false
      this.message = ''
      this.commentList.unshift(data.data.new_obj)
      this.totalCount++
    },
    async handleUpvote(id) {
      try {
        const index = this.commentList.findIndex((comment) => {
          return comment.com_id === id
        })
        if (typeof index === 'number') {
          if (this.commentList[index].is_liking) {
            await cancelCommentUpvote(this.commentList[index].com_id)
            this.commentList[index].like_count--
          } else {
            await commentUpvote(this.commentList[index].com_id)
            this.commentList[index].like_count++
          }
          this.commentList[index].is_liking = !this.commentList[index].is_liking
        }
      } catch (err) {
        console.log(err)
      }
    },
    showCommentContainer() {
      this.showCommentField = true
    },
    async initNewData() {
      try {
        const { data } = await getNewDetailById(this.articleId)
        this.articleInfo = data.data
        this.$nextTick(() => {
          const contentRef = this.$refs.contentRef
          const imgList = contentRef.querySelectorAll('img')
          const imgArr = []
          imgList.forEach((img, index) => {
            imgArr.push(img.getAttribute('src'))
            img.addEventListener('click', () => {
              ImagePreview({
                images: imgArr,
                startPosition: index
              })
            })
          })
        })
      } catch (err) {
        console.log(err)
      }
    },
    async flowEvent() {
      try {
        this.isLoading = true
        this.articleInfo.is_followed
          ? await cancelFlowUserById(this.articleInfo.aut_id)
          : await flowUserById(this.articleInfo.aut_id)
        this.articleInfo.is_followed = !this.articleInfo.is_followed
        this.isLoading = false
      } catch (err) {}
    },
    async collect() {
      try {
        Toast.loading({
          message: 'loading...',
          forbidClick: true
        })
        this.articleInfo.is_collected
          ? await cancelCollectArticleById(this.articleInfo.art_id)
          : await collectArticleById(this.articleInfo.art_id)
        this.articleInfo.is_collected = !this.articleInfo.is_collected
        Toast.success({
          message: `${this.articleInfo.is_collected ? '收藏成功' : '取消收藏'}`,
          forbidClick: true
        })
      } catch (err) {
        console.log(err)
      }
    },
    async upvote() {
      try {
        Toast.loading({
          message: 'loading...',
          forbidClick: true
        })
        this.articleInfo.attitude === 1
          ? await cancelUpvoteArticleById(this.articleInfo.art_id)
          : await upvoteArticleById(this.articleInfo.art_id)
        this.articleInfo.attitude = this.articleInfo.attitude === 1 ? -1 : 1
        Toast.loading({
          message: `${
            this.articleInfo.attitude === 1 ? '点赞成功' : '取消点赞'
          }`,
          duration: 100,
          forbidClick: true
        })
      } catch (err) {
        console.log(err)
      }
    }
  },
  mounted() {
    this.initNewData()
  },
  components: {
    CommentList,
    CommentReplyList
  }
}
</script>
<style lang="scss" scoped>
@import '@/style/github-markdown-css';
.article {
  background-color: #ffffff;
  .contain {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 45px;
    padding: 14px;
    background-color: #ffffff;
    overflow-y: scroll;
    // position: relative;
    .title {
      font-size: 20px;
      color: #3a3a3a;
      font-weight: 600;
      margin-bottom: 20px;
    }
    .base-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        color: #333333;
        font-size: 12px;
        .avatar {
          width: 50px;
          height: 50px;
        }
        .text-info {
          margin-left: 12px;
        }
        .update {
          color: #969799;
          font-size: 11px;
        }
      }
      .right {
        width: 80px;
      }
    }
    .content {
      margin-top: 14px;
      ::v-deep pre {
        text-wrap: wrap !important;
      }
      ::v-deep img {
        max-width: 100%;
      }
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
      width: 150px;
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
