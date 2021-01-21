import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/index'
import axios from 'axios'
import tdesign from '@tencent/tdesign-vue'
import '@tencent/tdesign-vue/dist/tdesign.css'

axios.defaults.baseURL = 'http://localhost'
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(tdesign)
Vue.use(router)
Vue.use(VueRouter)

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
