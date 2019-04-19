<template>
    <div>
        <h2>Login</h2>
    
    <form @submit.prevent="submit" >
      <div class="form-group">
        <label>Email address</label>
        <input
          type="email"
          class="form-control"
          placeholder="email@example.com"
          v-model="user.email"
          required
        >
      </div>


            <div class="form-group">
        <label>Password</label>
        <input
          type="password"
          class="form-control"
          placeholder="Password"
          v-model="user.password"
          required
        >
      </div>
           <button type="submit" class="btn btn-primary">Login</button>
        </form>
        <router-link :to="{ name: 'register' }"> Register here if you don't have an account...</router-link>

        <form-error v-if="errors">{{ errors }}</form-error>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FormError from './../partials/FormError'
export default {
    components: {
        FormError
    },
    data() {
        return {
            user: {}
        }
    },
    methods: {
        ...mapActions(['login']),
        onSubmit() {
            this.login(this.user)
        }
    },
    computed: {
        ...mapGetters({
            errors: 'getErrors'
        })
    }
}
</script>