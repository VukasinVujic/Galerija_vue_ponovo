<template>
  <div>
    <h5>Comments</h5>
    <ul 
      class="list-group list-group-flush"
      v-for="(comment, index) in comments"
      :key="comment.id"
    >
      <li 
        v-if="comment.body"
        class="list-group-item">
        <small>{{ comment.created_at }}</small>
        <p><strong>Author:</strong> {{ comment.user.first_name + ' ' + comment.user.last_name }}</p>
        <p>{{ comment.body }}</p>

        <button
          v-if="comment.user_id == userId"
          class="btn btn-dark"
          @click="onCommentRemove(comment.id, index)"
        >
          <i class="far fa-trash-alt"></i> Delete
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    comments: {
      type: Array,
      required: true
    },
    userId: {
      type: Number,
      required: false
    }
  },
  methods: {
    onCommentRemove(id, index) {
      this.$emit('removeComment', id, index)
    }
  },
}
</script>


<style scoped>
div {
  margin: 1rem;
}
p {
  margin: 0 !important;
}
</style>