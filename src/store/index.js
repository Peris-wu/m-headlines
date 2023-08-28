import Vue from 'vue'
import Vuex from 'vuex'

import { getItem, setItem } from '@/utils/handleStorage'
import { USER_KEY, USER_INFO_KEY } from '@/config/user'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY) || null,
    userInfo: getItem(USER_INFO_KEY) || null,
    cachePage: ['LayoutView'],
    tabBarActive: 0
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
    },
    addCachePage(state, cacheList) {
      cacheList.forEach((needCacheName) => {
        if (!state.cachePage.includes(needCacheName)) {
          state.cachePage.push(needCacheName)
        }
      })
    },
    removeCachePage(state, removeCacheList) {
      removeCacheList.forEach((removeCacheName) => {
        const index = state.cachePage.findIndex(
          (name) => name === removeCacheName
        )
        if (index !== -1) {
          state.cachePage.splice(index, 1)
        }
      })
    },
    setTabBarActive(state, currentActive) {
      state.tabBarActive = currentActive
    }
  },
  actions: {},
  modules: {}
})
