import VueRouter from 'vue-router'
import Index from '../page/index'

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
      {
        path: '/',
        component: Index
      },
      {
        path: '*',
        redirect: '/'
      }
    ]
  })

  export default router