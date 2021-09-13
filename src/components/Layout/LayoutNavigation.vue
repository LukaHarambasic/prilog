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

<style scoped>

</style>
