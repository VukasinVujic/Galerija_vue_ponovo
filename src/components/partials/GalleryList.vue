<template>
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
</template>

<script>
export default {
  props: {
    galleries: {
      type: Array,
      required: true
    }
  }
}
</script>

