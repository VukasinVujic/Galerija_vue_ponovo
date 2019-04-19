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
      <div v-if="errors.body">
        <form-error>{{ errors.body[0]}}</form-error>
      </div>
    </form>
  </div>
</template>

<script>
import FormError from './FormError'
export default {
  components: {
    FormError
  },
  props: ['errors'],
  data() {
    return {
      body: ''
    }
  },
  methods: {
    onSubmit() {
      if(this.body) {
        this.$emit('submitComment', this.body)
        this.body = ''
      }
    }
  }
}
</script>