<template>
  <div>
    <h1>{{ gallery.title }}</h1>
    <router-link 
      v-if="userId"
      :to="{ name: 'author', params: { id: userId } }"
      class="router-link"
    >
      {{ username }}
    </router-link>
    <p>{{ gallery.description }}</p>

    <div class="my-carousel">
      <b-carousel id="carousel1"
        controls
        indicators
        background="#ababab"
        :interval="3000"
        v-model="slide"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
      >
      <div
        v-for="(image, index) in images"
          :key="index"
      >
        <a :href="image.url" target="blank">
          <b-carousel-slide>
              <img slot="img" class="d-block img-fluid w-100" width="640" height="480"
              :src="image.url" alt="image slot">
          </b-carousel-slide>
        </a>
      </div>
      </b-carousel>
    </div>

    <div v-if="comments.length">
      <comment-list
        :userId="currentUserId"
        :comments="comments"
        @removeComment="removeComment"
      ></comment-list>
    </div>

    <comment-form 
      v-if="currentUserId"
      @submitComment="submitComment"
      :errors="errors"
    ></comment-form>
  </div>
</template>

<script>
import galleryService from './../utils/services/gallery-service'
import commentsService from './../utils/services/comments-service'
import bCarousel from 'bootstrap-vue/es/components/carousel/carousel'
import bCarouselSlide from 'bootstrap-vue/es/components/carousel/carousel-slide'
import CommentList from './partials/CommentList'
import CommentForm from './partials/CommentForm'
import { mapGetters } from 'vuex'
export default {
  components: {
    bCarousel,
    bCarouselSlide,
    CommentList,
    CommentForm    
  },
  data() {
    return {
      id: null,
      gallery: {},
      userId: null,
      username: null,
      images: [],
      slide: 0,
      sliding: null,
      comments: [],
      errors: []
    }
  },
  methods: {
    onSlideStart () {
      this.sliding = true
    },
    onSlideEnd () {
      this.sliding = false
    },
    submitComment(body) {
      commentsService.addComment(this.id, body)
      .then(comment => {
          this.comments.push(comment)
          this.errors = [] 
      })
      .catch(errors => {
        this.errors = errors.response.data.errors
      })
    },
    removeComment(id, index) {
      this.comments.splice(index, 1)
      commentsService.removeComment(id)
    }
  },
  beforeRouteEnter (to, from, next) {
    galleryService.getGallery(Number(to.params.id))
    .then(gallery => {
      next(vm => {
        vm.id = Number(to.params.id)
        vm.gallery = gallery
        vm.userId = gallery.user_id
        vm.username = gallery.user.first_name + ' ' + gallery.user.last_name
        vm.images = gallery.images
        vm.comments = gallery.comments
      })
    })
  },
  computed: {    
    ...mapGetters({
      user: 'getUser'
    }),
    currentUserId() {
      if(this.user) {
        return this.user.id
      }
      return 0
    }
    
  }
}
</script>