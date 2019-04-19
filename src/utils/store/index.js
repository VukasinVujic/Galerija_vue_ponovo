import Vue from 'vue'
import Vuex from 'vuex'
import authStore from './auth-store'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        authStore
    }
})

export default store