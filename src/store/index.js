import Vue from 'vue'
import Vuex from 'vuex'

import { getItem, setItem } from '@/utils/handleStorage'
import { USER_KEY } from '@/config/user'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY) || null
  },
  getters: {},
  mutations: {
    setUser(state, user) {
      state.user = user
      setItem(USER_KEY, user)
    }
  },
  actions: {},
  modules: {}
})
