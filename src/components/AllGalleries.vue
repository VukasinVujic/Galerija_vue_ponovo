<template>
  <div>
    <h1>All Galleries</h1>

    <div 
      class="alert alert-danger"
      v-if="!galleries.length"
      >
      <p>There are no galleries to show!</p>
    </div>

    <search-input 
      v-if="galleries.length"
      @search="onSearch"
    >
    </search-input>

    <gallery-list :galleries="galleries"></gallery-list>
    
    <app-pagination
      v-if="galleries.length && (page != last_page)"
      @loadMore="loadMore"
    >
    </app-pagination>
  </div>
</template>

<script>
import galleryService from './../utils/services/gallery-service'
import SearchInput from './partials/SearchInput'
import GalleryList from './partials/GalleryList'
import AppPagination from './partials/AppPagination'
export default {
  components: {
    SearchInput,
    GalleryList,
    AppPagination
  },
  data() {
    return {
      galleries: [],
      page: 1,
      term: '',
      last_page: null
    }
  },
  methods: {
    onSearch(term) {
      this.term = term
      this.page = 1
      galleryService.getAll(this.page, this.term)
      .then(galleries => {
        this.galleries = galleries.data
        this.last_page = galleries.last_page
      })
    },
    loadMore() {
      this.page++
      galleryService.getAll(this.page, this.term)
      .then(galleries => {     
        this.galleries.push(...galleries.data)
        this.last_page = galleries.last_page
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    galleryService.getAll()
    .then(galleries => {            
      next(vm => {
        vm.galleries = galleries.data
        vm.last_page = galleries.last_page
      })
    })
  },
}
</script>