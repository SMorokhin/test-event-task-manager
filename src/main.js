import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import DatetimePicker from 'vuetify-datetime-picker'
import axios from 'axios'
import VueLoading from 'vuejs-loading-plugin'

Vue.config.productionTip = false
Vue.use(DatetimePicker).use(VueLoading, {
  text: ''
})
new Vue({
  router,
  store,
  vuetify,
  axios,
  render: h => h(App)
}).$mount('#app')
