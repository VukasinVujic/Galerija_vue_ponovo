<template>
  <div>
    <h5>Add a Comment</h5>
    <form>
      <div class="form-group">
        <textarea 
          class="form-control"
          v-model="body"
          @keyup.enter="onSubmit"
          maxlength="1000"
          required
        ></textarea>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      body: ''
    }
  },
  methods: {
    onSubmit() {
      this.$emit('submitComment', this.body)
      this.body = ''
    }
  }
}
</script>

<style>
</style>