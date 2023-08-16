import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

// related time filter
Vue.filter('timeFilter', (value) => {
  return dayjs().to(dayjs(value))
})

// dateTime filter
Vue.filter('dateTime', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(value).format(format)
})

export default dayjs
