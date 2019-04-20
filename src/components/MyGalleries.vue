<template>
  <div>
    <h1>My Galleries</h1>
    <div 
      class="alert alert-danger"
      v-if="!galleries.length"
      >
      <p>There are no galleries to show!</p>
    </div>

    <search-input @search="onSearch"></search-input> 

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
      term: '',
      page: 1,
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
    onSearch(term) {
      this.page = 1
      this.term = term
      galleryService.getUserGalleries(this.id, this.page, this.term)
      .then(galleries => {
        this.galleries = galleries.data
        this.last_page = galleries.last_page
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      let id = Number(localStorage.getItem('id'))
      vm.id = id ? id : 0
      galleryService.getUserGalleries(vm.id, vm.page, vm.term)
      .then(galleries => {
        vm.galleries = galleries.data
        vm.last_page = galleries.last_page
      })
    })
  }
}
</script>