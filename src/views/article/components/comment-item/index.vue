<!--  -->
<template>
  <div class="comment-item">
    <div class="left">
      <van-image fit="cover" round :src="comment.aut_photo" class="avatar" />
    </div>
    <div class="right">
      <div class="name">
        <span>{{ comment.aut_name }}</span>
        <div @click="upvote">
          <van-icon
            :name="comment.is_liking ? 'good-job' : 'good-job-o'"
            :style="{ color: comment.is_liking ? 'orange' : '' }"
          />
          {{ comment.like_count }}
        </div>
      </div>
      <div class="content">
        {{ comment.content }}
      </div>
      <div class="update">
        <span class="update-text">{{
          comment.pubdate | dateTime('MM-DD HH:mm')
        }}</span>
        <van-button class="reply" size="mini" round @click="replyComment"
          >{{ comment.reply_count }}回复</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {
    upvote() {
      this.$emit('upvote', this.comment.com_id)
    },
    replyComment() {
      this.$emit('replyComment', this.comment)
    }
  },
  components: {},
  mounted() {}
}
</script>
<style lang="scss" scoped>
.comment-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  // min-height: 80px;
  .left {
    .avatar {
      width: 36px;
      height: 36px;
    }
  }
  .right {
    flex: 1;
    margin-left: 13px;
    .name {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      color: #406599;
    }
    .content {
      font-size: 16px;
      color: #222222;
      padding: 15px 0;
    }
    .update {
      display: flex;
      align-items: center;
      .update-text {
        font-size: 10px;
      }
      .reply {
        width: 60px;
        margin-left: 10px;
      }
    }
  }
}
</style>
