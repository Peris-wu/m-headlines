import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import '@/utils/day'
import _ from 'lodash'
// amfe-flexible
import 'amfe-flexible'
import '@/style/index.scss'

Vue.config.productionTip = false
Vue.prototype.$_ = _
Vue.filter('sex', (val) => {
  return val === 0 ? '男' : '女'
})
Vue.use(Vant)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
