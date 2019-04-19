import Vue from 'vue'
import VueRouter from 'vue-router'

import AppLogin from './components/auth/AppLogin'
import AppRegister from './components/auth/AppRegister'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home'
    },
    {
        path: '/login',
        component: AppLogin,
        name: 'login',
        meta: {
            guest: true
        }
    },
    {
        path: '/register',
        component: AppRegister,
        name: 'register',
        meta: {
            guest: true
        }
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router