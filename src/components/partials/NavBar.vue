<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <ul>
        <li>
          <router-link :to="{name:'home'}">Galleries home</router-link>
        </li>
        <li>
          <router-link :to="{name:'login'}">Login</router-link>
        </li>
        <li>
          <router-link :to="{name:'register'}">Register</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
}
</script>

<style>
</style>