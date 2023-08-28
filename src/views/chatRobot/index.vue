<!--  -->
<template>
  <div class="chat-robot">
    <div class="header">
      <van-nav-bar title="小爱同学" left-arrow />
    </div>
    <div class="main" ref="mainRef">
      <div v-for="msg in messageList" :key="msg.timestamp">
        <div class="msg" :class="msg.isSelf ? 'reverse' : ''">
          <div class="avatar">
            <van-image
              round
              width="40"
              height="40"
              fit="cover"
              :src="msg.isSelf ? userPhoto : robotImg"
            />
          </div>
          <span
            :style="
              msg.isSelf ? { paddingRight: '10px' } : { paddingLeft: '10px' }
            "
            >{{ msg.msg }}</span
          >
        </div>
      </div>
    </div>
    <div class="footer">
      <van-field
        @keyup.enter="sendMsg"
        v-model="message"
        placeholder="请输入用户名"
        :border="false"
      />
      <van-button type="info" size="small" class="btn" @click="sendMsg"
        >发送</van-button
      >
    </div>
  </div>
</template>

<script>
import robotImg from '@/assets/images/chat-robot/robot.jpg'
import { io } from 'socket.io-client'
import { mapState } from 'vuex'
import { USER_INFO_KEY, USER_CHAT_ROBOT } from '@/config/user'
import { getItem, setItem } from '@/utils/handleStorage'
export default {
  name: 'RoBotView',
  data() {
    return {
      message: '',
      socket: null,
      messageList: [],
      robotImg,
      userPhoto: ''
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    scrollToBottom() {
      this.$nextTick(() => {
        const mainRef = this.$refs.mainRef
        mainRef.scrollTop = mainRef.scrollHeight
      })
    },
    sendMsg() {
      const msg = {
        msg: this.message,
        isSelf: true,
        timestamp: Date.now()
      }
      this.socket.emit('message', msg)
      this.messageList.push(msg)
      this.message = ''
      setItem(USER_CHAT_ROBOT, this.messageList)
      this.scrollToBottom()
    },
    initConnection() {
      try {
        if (this.user) {
          const socket = io('https://toutiao.itheima.net', {
            query: {
              token: `Bearer ${this.user.data.token}`
            },
            transports: ['websocket']
          })
          this.socket = socket
          socket.on('connect', () => {
            console.log('connected', socket.id)
          })
          socket.on('message', (data) => {
            this.messageList.push(data)
            setItem(USER_CHAT_ROBOT, this.messageList)
            this.scrollToBottom()
          })
          socket.on('disconnect', () => {
            console.log('disconnect')
          })
        }
      } catch (err) {
        console.log(err)
      }
    }
  },
  components: {},
  mounted() {
    this.initConnection()
    const { data } = getItem(USER_INFO_KEY)
    this.userPhoto = data.photo
    this.messageList = getItem(USER_CHAT_ROBOT) || []
    this.scrollToBottom()
  },
  beforeDestroy() {
    this.socket && this.socket.disconnect()
  }
}
</script>
<style lang="scss" scoped>
.chat-robot {
  .main {
    position: fixed;
    top: 46px;
    bottom: 45px;
    left: 0;
    right: 0;
    overflow: scroll;
    behavior: smooth;
    .msg {
      display: flex;
      align-items: center;
      font-size: 18px;
      padding: 10px;
      .avatar {
        width: 40px;
        height: 40px;
        ::v-deep .van-image {
          width: 100%;
          height: 100%;
        }
      }
    }
    .reverse {
      flex-direction: row-reverse;
    }
  }
  .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    background-color: #ffffff;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    .btn {
      width: 50px;
    }
  }
}
</style>
