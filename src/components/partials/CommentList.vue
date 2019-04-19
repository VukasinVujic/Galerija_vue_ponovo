<template>
  <div>
    <h5>Comments</h5>
    <ul 
      class="list-group list-group-flush"
       v-for="comment in comments"
      :key="comment.id"
    >
      <li v-if="comment.body"
        class="list-group-item">
        <small>{{ comment.created_at }}</small>
        <p><strong>Author:</strong> {{ comment.user.first_name + ' ' + comment.user.last_name }}</p>
        <p>{{ comment.body }}</p>
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
    }
  }
}
</script>