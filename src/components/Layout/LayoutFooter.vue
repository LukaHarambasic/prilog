<template>
  <footer>
    <ul>
      <li>
        <router-link to="/">
          prilog.
        </router-link>
      </li>
      <li v-if="store.user">
        <button @click.prevent="store.logoutUser()">
          Logout
        </button>
      </li>
      <li v-else>
        <button @click.prevent="store.loginUser()">
          Login with Google
        </button>
      </li>
    </ul>
  </footer>
</template>

<script setup>
import { useMainStore } from '@/store'

const store = useMainStore()
</script>

<style lang="sass" scoped>

footer
  text-align: center
  ul
    list-style: none
    margin: 0
    padding: 0
    li
      margin: 0 0 .25rem 0
</style>
