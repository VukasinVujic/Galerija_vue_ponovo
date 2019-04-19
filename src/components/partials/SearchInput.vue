<template>
  <form 
    class="form-inline"

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
</template>

<script>
export default {
  data() {
    return {
      term: ''
    }
  },
  methods: {
    onSearch() {
      this.$emit('search', this.term)
    }
  }
}
</script>
