import authService from './../services/auth-service'
import router from '../../routes'

const getUserFromLS = () => {
    
    let user = localStorage.getItem('user')
    if(user){
        return JSON.parse(user)
    }
}

export default {
    state: {
        user: getUserFromLS(),
        errors: null,
    },
    mutations: {
        SET_DATA(state, { user }) {
            state.user = user,
            state.errors = null
        },
        SET_ERRORS(state, errors) {
            state.errors = errors
        }
    },
    actions: {
        async login({ commit }, { email, password }) {
            try {
                const { data } = await authService.login(email, password)
                commit('SET_DATA', data)
                router.push({ name: 'home' })
            } catch(e) {
                commit('SET_ERRORS', e.response.data.message)
            }
        },

        logout({ commit }) {
            authService.logout()
            commit('SET_DATA', { user: null })
        },


        async register({ commit }, user) {
            try {
                commit('SET_DATA', await authService.register(user))
                router.push({ name: 'home' })               
            } catch(e) {
                commit('SET_ERRORS', e)
            }
        }
    },
    getters: {
        getUser: state => state.user,
        getErrors: state => state.errors
    },


} 