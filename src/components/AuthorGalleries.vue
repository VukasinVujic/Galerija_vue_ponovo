<template>
  <div>
    <h1>{{ !galleries.length ? 'Sorry' : 'All Galleries by ' +  username }}</h1>
    <div 
      class="alert alert-danger"
      v-if="!galleries.length"
      >
      <p>There are no galleries to show!</p>
    </div>

    <form 
      class="form-inline"
      v-if="galleries.length"
      @submit.prevent="onSearch"           
    >
      <input 
        class="form-control" 
        type="search" 
        placeholder="Filter Galleries" 
        aria-label="Search"
        v-model="term"
        autofocus
      >
      <button 
        class="btn btn-outline-dark" 
        type="submit"
      >
        Filter Galleries
      </button>
    </form>

    <div class="galleries">
      <div 
        class="card" 
        v-for="gallery in galleries"
        :key="gallery.id"
      >
        <img 
          :src="gallery.images[0].url" 
          class="card-img-top" 
          alt="..."
        >
        <div class="card-body">
          <h5 class="card-title">
            <router-link
              :to="{ name: 'gallery', params: { id: gallery.id }}"
              class="router-link"
            >
              {{ gallery.title }}
            </router-link>
          </h5>
          <router-link 
            :to="{ name: 'author', params: { id: gallery.user.id }}"
            class="router-link"
          >
            {{ gallery.user.first_name + ' ' + gallery.user.last_name }}
          </router-link>
          <br>
          <small>Created at: {{ gallery.created_at }}</small>
        </div>
      </div>
    </div>

    <app-pagination
      v-if="galleries.length && (page != last_page)"
      @loadMore="loadMore"
    >
    </app-pagination>
  </div>
</template>

<script>
import galleryService from './../utils/services/gallery-service'
import AppPagination from './partials/AppPagination'
export default {
  components: {
    AppPagination
  },
  data() {
    return {
      galleries: [],
      page: 1,
      term: '',
      last_page: null,
      id: null
    }
  },
  methods: {
    loadMore() {
      this.page++
      galleryService.getUserGalleries(this.id, this.page, this.term)
      .then(galleries => {     
        this.galleries.push(...galleries.data)
        this.last_page = galleries.last_page
      })
    },
    onSearch() {
      this.page = 1
      galleryService.getUserGalleries(this.id, this.page, this.term)
      .then(galleries => {
        this.galleries = galleries.data
        this.last_page = galleries.last_page
      })
    }
  },
  computed: {
    username() {
      return this.galleries[0].user.first_name + ' ' + this.galleries[0].user.last_name
    }
  },
  created() {
    this.id = Number(this.$route.params.id)
    galleryService.getUserGalleries(this.id, this.page, this.term)
    .then(galleries => { 
      this.galleries = galleries.data
      this.last_page = galleries.last_page
    })
  },
}
</script>