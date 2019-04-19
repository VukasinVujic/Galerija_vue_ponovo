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
        path: '/my-galleries',
        name: 'my-galleries',
        meta: {
            auth: true
        }
    },
    {
        path: '/create',
        name: 'create-gallery',
        meta: {
            auth: true
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

router.beforeEach((to, from, next) => {
    const isAuth = !! localStorage.getItem('user')

    if(isAuth && to.meta.guest) {
        return next({ name: 'home' })
    }

    if(!isAuth && to.meta.auth) {
        return next({ name: 'login' })
    }

    return next()
})


export default router