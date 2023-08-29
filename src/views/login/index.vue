<!--  -->
<template>
  <div class="login">
    <div class="header">
      <van-nav-bar title="注册/登录" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="form">
      <van-form
        ref="loginForm"
        validate-first
        @submit="login"
        @failed="onFailed"
        :show-error="false"
        :show-error-message="false"
      >
        <van-field
          name="mobile"
          v-model="userInfo.mobile"
          left-icon="phone-circle-o"
          placeholder="请输入手机号"
          :rules="fieldsRules.mobile"
        />
        <van-field
          name="code"
          v-model="userInfo.code"
          left-icon="bag-o"
          class="code"
          placeholder="请输入验证码"
          :rules="fieldsRules.code"
        >
          <template #button>
            <van-button
              size="mini"
              round
              class="send-code-btn"
              native-type="button"
              :disabled="isClicked"
              @click="calCountDown"
            >
              <!-- {{ codeBtnText }}{{ isCount ? 's' : '' }} -->
              <span v-if="!isClicked">发送验证码</span>
              <van-count-down :time="time" @finish="timeFinish" v-else>
                <template #default="timeData">
                  <span>{{ timeData.seconds }}s</span>
                </template>
              </van-count-down>
            </van-button>
          </template>
        </van-field>
        <div class="sub-btn">
          <van-button block type="info" native-type="submit"> 登录 </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { loginRequest } from '@/api/user'
import { Toast } from 'vant'
export default {
  name: 'LoginView',
  data() {
    return {
      isClicked: false,
      time: 10 * 1000,
      userInfo: {
        mobile: '13229157502',
        code: '246810'
      },
      fieldsRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1[34578]\d{9}$/,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空',
            trigger: 'blur'
          },
          {
            pattern: /^[0-9]{4,}$/,
            message: '请输入正确的验证码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    isCount() {
      return typeof this.codeBtnText === 'number'
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    timeFinish() {
      this.isClicked = false
    },
    async calCountDown() {
      try {
        // verify mobile
        await this.$refs.loginForm.validate('mobile')
        this.isClicked = true
      } catch (err) {
        Toast.fail(err.message)
      }
    },
    async login() {
      // let toast
      try {
        Toast.loading({
          forbidClick: true,
          message: '登录中...',
          duration: 0
        })
        console.log(this.userInfo)
        const { data } = await loginRequest(this.userInfo)
        console.log(data)
        this.$store.commit('setUser', data)
        this.$store.commit('removeCachePage', ['LayoutView'])
        Toast.success('登录成功')
        this.$router.replace(this.$route.query.redirect || { name: 'home' })
      } catch (error) {
        console.log(error)
      }
    },
    onFailed(errorInfo) {
      Toast.fail(errorInfo.errors[0].message)
    }
  },
  components: {}
}
</script>
<style lang="scss" scoped>
.login {
  .code {
    .send-code-btn {
      width: 76px;
      height: 23px;
      background-color: #ededed;
      .van-button__text {
        font-size: 11px;
        color: #666666;
      }
    }
  }
  .sub-btn {
    padding: 25px 16px;

    .van-button--info {
      background-color: #6db4fb;
      border: none;
    }
    .van-button--normal {
      font-size: 15px;
    }
  }
}
</style>
