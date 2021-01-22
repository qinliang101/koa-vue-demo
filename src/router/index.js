import VueRouter from 'vue-router'
import Index from '../page/index'
import User from '../page/user'

const router = new VueRouter({
    // mode: 'history',
    base: __dirname,
    routes: [
        {
            path: '/',
            component: Index
        },
        {
            path: '/user',
            component: User
        }
    ]
})

export default router