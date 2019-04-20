import http from './http-service'

class AuthService {
    login(email, password) {
        return http.post('auth/login', {
            email,
            password
        })
        .then(response => {
            this.loggingIn(response.data)
            return response
        })
    }

    register({ first_name, last_name, email, password, password_confirmation, terms }) {
        return http.post('auth/register', { 
            first_name, 
            last_name, 
            email, 
            password, 
            password_confirmation, 
            terms 
        })
        .then(({ data }) => {
            this.loggingIn(data)
            return data
        })
        .catch(error => Promise.reject(error.response.data.errors))
    }

    setAuthHeaders(token) {
        if(!token) {
            delete http.defaults.headers.common['Authorization']
            return
        }

        return http.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    logout() {
        return http.get('auth/logout')
        .then(() => {
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            localStorage.removeItem('id')
            this.setAuthHeaders()
        })
    }

    loggingIn(data) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('id', data.user.id)
        this.setAuthHeaders(data.token)
    }
}

const checkForToken = (service) => {
    let token = localStorage.getItem('token')
    if(token){
        service.setAuthHeaders(token)
    }
}

const authService = new AuthService()

checkForToken(authService)

export default authService 