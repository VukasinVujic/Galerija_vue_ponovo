<template>
  <div class="create-gallery">
    <h1>Create Gallery</h1>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label>Title</label>
        <input 
          v-model="gallery.title"
          type="text" 
          class="form-control" 
          placeholder="Title"
          minlength="2"
          maxlength="255"
          required
        >
        <div v-if="errors">
          <form-error v-if="errors.title">{{ errors.title[0] }}</form-error>
        </div>
      </div>

      <div class="form-group">
        <label>Description</label>
        <textarea 
          v-model="gallery.description"                    
          type="text" 
          class="form-control" 
          placeholder="Description"
          maxlength="1000"
        >
        </textarea>

        <div v-if="errors">
          <form-error v-if="errors.description">{{ errors.description[0] }}</form-error>
        </div>
      </div>

      <div class="form-group" v-for="(n, index) in range" :key="index">
        <label>Image {{ n }} URL</label>
        <input 
          v-model="gallery.images[index].url"
          type="text"
          class="form-control"
          placeholder="Insert URL"
          required
        >
        <div v-if="errors">
          <form-error v-if="errors[`images.${index}.url`]">Invalid format.</form-error>
        </div>

        <div class="btn-group">
          <button 
            type="button" 
            class="btn btn-dark btn-sm"
            @click="moveUp(index)"
            :disabled="(range == 1) || (!index)"
          >
            <i class="fas fa-chevron-up"></i> Move Up
          </button>
          <button 
            type="button"
            class="btn btn-dark btn-sm"
            @click="moveDown(index)"
            :disabled="(range == 1) || (index == range - 1)"
          >
            <i class="fas fa-chevron-down"></i> Move down
          </button>
          <button 
            type="button"
            class="btn btn-dark btn-sm"
            @click="remove(index)"
            :disabled="range == 1"
          >
            <i class="far fa-trash-alt"></i> Delete
          </button>
        </div>
      </div>

      <button
        type="button"
        class="btn btn-dark"
        @click="addInput"
      >
        Add Input
      </button>

      <button 
        type="submit" 
        class="btn btn-dark"
      >
        Create
      </button>

      <router-link 
        :to="{ name: 'my-galleries' }"
        class="btn btn-dark"
      >
        Cancel
      </router-link>
    </form>

  </div>
</template>

<script>
import galleryService from './../utils/services/gallery-service'
import FormError from './partials/FormError'
export default {
  components: {
    FormError
  },
  data() {
    return {
      range: 1,
      gallery: {
        title: '',
        description: '',
        images: [{ url: '', order: 1 }]
      },
      errors: {},
    }
  },
  methods: {
    onSubmit() {         
      galleryService.createGallery(this.gallery)
      .then(()=> {
        this.$router.push({ name: 'my-galleries' })
      })
      .catch(errors => {
        this.errors = errors.response.data.errors
      })
    },
    addInput() {
      this.range++
      this.gallery.images.push({ url: '', order: this.range })
    },
    moveUp(index) {
      if(index) {        
        this.gallery.images.splice( index - 1, 0, this.gallery.images.splice( index, 1 )[0])
      }
    },
    moveDown(index) {
      if(index != this.range -1 ) {
        this.gallery.images.splice( index + 1, 0, this.gallery.images.splice( index, 1 )[0])
      }
    },
    remove(index) {
      if(this.range > 1) {        
        this.range--
        this.gallery.images.splice(index, 1)
      }
    }
  }
}
</script>