<!--  -->
<template>
  <div class="article-item">
    <van-cell>
      <div slot="title" class="f16 title van-multi-ellipsis--l2">
        {{ article.title }}
      </div>
      <div slot="label">
        <div class="label-top" v-if="article.cover.type === 3">
          <van-image
            fit="cover"
            v-for="(img, index) in article.cover.images"
            :key="index"
            :src="img"
          ></van-image>
        </div>
        <div class="label-btm">
          <span>{{ article.aut_name }}</span>
          <span>{{ article.comm_count }}评论</span>
          <span>{{ article.pubdate | timeFilter }}</span>
        </div>
      </div>
      <div v-if="article.cover.type === 1">
        <van-image fit="cover" class="oneImg" :src="article.cover.images[0]" />
      </div>
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utils/day'
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      require: true
    }
  },
  data() {
    return {}
  },
  filters: {
    timeFilter(value) {
      return dayjs().to(dayjs(value))
    }
  },
  components: {}
}
</script>
<style lang="scss" scoped>
.article-item {
  .title {
    color: #3a3a3a;
  }
  .oneImg {
    width: 116px;
    height: 73px;
  }
  .label-top {
    display: flex;
    .van-image {
      flex: 1;
      height: 73px;
      &:not(:last-child) {
        padding-right: 4px;
      }
    }
  }
  .label-btm {
    font-size: 11px;
    color: #b4b4b4;
    margin-top: 8px;
    span {
      margin-right: 12px;
    }
  }
  .van-cell__value {
    flex: unset;
  }
}
</style>
