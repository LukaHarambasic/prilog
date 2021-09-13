<template>
  <nav>
    <ul v-if="store.user">
      <li>
        <router-link to="/admin/create/log">
          Create Log
        </router-link>
      </li>
      <li>
        <router-link to="/admin/create/entry">
          Create Entry
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { useMainStore } from '@/store'

const store = useMainStore()
</script>

<style lang="sass" scoped>
nav
  ul
    list-style: none
    margin: 0
    padding: 0
  li
    margin: 0 0 .25rem 0
</style>
