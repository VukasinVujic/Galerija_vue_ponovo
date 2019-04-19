<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <router-link 
            :to="{ name: 'home' }"
             class="nav-link"
        >
            Galleries App
        </router-link>


<ul class="navbar-nav mr-auto">
    <li class="nav-item">

         <router-link 
                    :to="{ name: 'home' }"
                    class="nav-link"
                >
                    All Galleries
                </router-link>                
            </li>  
            <li 
                v-if="user"
                class="nav-item"
            >
                <router-link 
                    :to="{ name: 'my-galleries' }"
                    class="nav-link"
                >
                    My Galleries
                </router-link>                
            </li> 
            <li 
                v-if="user"
                class="nav-item"
            >
                <router-link 
                    :to="{ name: 'create-gallery' }"
                    class="nav-link"
                >
                    Create New Gallery
                </router-link>                
            </li>         
        </ul>

            <form 
            v-if="user"
            class="form-inline my-2 my-lg-0">

            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success  my-2 my-sm-0" type="submit">Search</button>
        </form>
      <ul v-if="!user"
            class="navbar-nav">
        
        <li class="nav-item">
          <router-link :to="{name:'login'}">Login</router-link> 
        </li>
        <li class="nav-item">
          <router-link :to="{name:'register'}">Register</router-link>
        </li>
      </ul>

      <ul v-else
            class="navbar-nav">
            <li class="nav-item">
                <a 
                    href="#"
                    class="nav-link"
                    @click="onClick">
                    Logout
                </a>
            </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    computed: {
        ...mapGetters({
            user: 'getUser'
        })
    },
    methods: {
        ...mapActions(['logout']),
        onClick() {
            this.logout()
        }
    }
}
</script>

<style>
</style>