import Vue from 'vue'
import Vuex from 'vuex'

import { getItem, setItem } from '@/utils/handleStorage'
import { USER_KEY, USER_INFO_KEY } from '@/config/user'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY) || null,
    userInfo: getItem(USER_INFO_KEY) || null
  },
  getters: {},
  mutations: {
    setUser(state, user) {
      state.user = user
      setItem(USER_KEY, user)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
      setItem(USER_INFO_KEY, userInfo)
    }
  },
  actions: {},
  modules: {}
})
