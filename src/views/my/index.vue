<!--  -->
<template>
  <div class="my">
    <div class="bg" v-if="user">
      <div class="base-info">
        <van-cell-group :border="false">
          <van-cell center>
            <template slot="title">
              <div class="pl">{{ curUserInfo.name }}</div>
            </template>
            <template slot="icon">
              <div>
                <van-image fit="cover" round :src="curUserInfo.photo" />
              </div>
            </template>
            <template slot="right-icon">
              <van-button size="mini" round to="/user-profile"
                >编辑资料</van-button
              >
            </template>
          </van-cell>
        </van-cell-group>
      </div>
      <div class="base-data">
        <van-grid :border="false">
          <van-grid-item>
            <template slot="text">
              <div class="f18">{{ curUserInfo.art_count }}</div>
              <div class="f11">头条</div>
            </template>
          </van-grid-item>
          <van-grid-item>
            <template slot="text">
              <div class="f18">{{ curUserInfo.follow_count }}</div>
              <div class="f11">关注</div>
            </template>
          </van-grid-item>
          <van-grid-item>
            <template slot="text">
              <div class="f18">{{ curUserInfo.fans_count }}</div>
              <div class="f11">粉丝</div>
            </template>
          </van-grid-item>
          <van-grid-item>
            <template slot="text">
              <div class="f18">{{ curUserInfo.like_count }}</div>
              <div class="f11">获赞</div>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
    <div class="no-login-bg" v-else>
      <div class="no-login-img-text" @click="toLogin">
        <img src="~@/assets/images/my/unlogin-img.png" alt="login icon" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <div class="collect-history">
      <van-grid column-num="2" icon-size="36">
        <van-grid-item text="收藏" icon="star-o"></van-grid-item>
        <van-grid-item text="历史" icon="browsing-history-o"></van-grid-item>
      </van-grid>
    </div>
    <div class="robot-notify">
      <van-cell title="消息通知" is-link :to="{ name: 'home' }" />
      <van-cell title="机器人" is-link :to="{ name: 'chatRobot' }" />
    </div>
    <div class="logOut" v-if="user">
      <van-cell title="退出登录" @click="logOut" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Dialog } from 'vant'
import { getUserInfo } from '@/api/user'
export default {
  name: 'myView',
  data() {
    return {
      curUserInfo: {
        name: '',
        photo: '',
        art_count: 0,
        follow_count: 0,
        fans_count: 0,
        like_count: 0
      }
    }
  },
  computed: {
    ...mapState(['user', 'userInfo'])
  },
  methods: {
    toLogin() {
      this.$router.push({
        name: 'login'
      })
    },
    logOut() {
      Dialog.confirm({
        title: '退出确认',
        message: '退出当前账号，将不能同步收藏，发布评论和分享等操作'
      })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', null)
          this.$store.commit('setUserInfo', null)
        })
        .catch(() => {
          // on cancel
        })
    },
    async getUserInfo() {
      try {
        const { data } = await getUserInfo()
        this.$store.commit('setUserInfo', data)
        this.curUserInfo = data.data
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    }
  },
  mounted() {
    console.log(this.userInfo)
    if (this.userInfo !== null) {
      this.curUserInfo = this.userInfo.data
    }
    if (this.user !== null) {
      this.getUserInfo()
    }
  },
  components: {}
}
</script>
<style lang="scss" scoped>
.my {
  .pl {
    color: #ffffff;
    padding-left: 10px;
  }
  .bg {
    background: url('@/assets/images/my/banner.png') no-repeat;
    background-size: cover;
    .base-info {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      height: 115px;
      padding-top: 50px;
      .van-cell-group {
        width: 100%;
        background-color: unset;
      }
      .van-cell {
        background-color: unset;
      }
      .van-image {
        width: 70px;
        height: 70px;
        border: 1px solid #fff;
      }
      .van-button {
        color: #666666;
        font-size: 10px;
      }
    }
    .base-data {
      .van-grid-item {
        color: #ffffff;
      }
      .van-grid-item {
        ::v-deep .van-grid-item__content {
          background-color: unset;
        }
      }
    }
  }
  .no-login-bg {
    background: url('@/assets/images/my/banner.png') no-repeat;
    background-size: cover;
    .no-login-img-text {
      height: 183.8px;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 66px;
        height: 66px;
      }
      .text {
        font-size: 14px;
        color: #ffffff;
      }
    }
  }
  .collect-history {
    .van-grid-item {
      height: 70px;
      ::v-deep .van-icon {
        font-size: 22px !important;
      }
      ::v-deep .van-icon-star-o {
        color: #eb5253;
      }
      ::v-deep .van-icon-browsing-history-o {
        color: #ff9d1d;
      }
      ::v-deep .van-grid-item__text {
        font-size: 14px;
        color: #333333;
      }
    }
  }
  .robot-notify {
    margin: 5px 0;
  }
  .logOut {
    .van-cell__title {
      text-align: center;
      color: #d86262;
    }
  }
}
</style>
