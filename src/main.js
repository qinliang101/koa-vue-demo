import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/index'
import http from './config/http'
import tdesign from '@tencent/tdesign-vue'
import '@tencent/tdesign-vue/dist/tdesign.css'

Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.use(tdesign)
Vue.use(router)
Vue.use(VueRouter)

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
