<template>
  <section>
    <h1>{{ log.title }}</h1>
    <ul v-if="log">
      <li
        v-for="entry in log.log_entries"
        :key="entry.id"
      >
        {{ entry.title }}
      </li>
    </ul>
    <div v-else>
      No log found O.o
    </div>
  </section>
</template>

<script setup>
import { useMainStore } from '@/store'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

onMounted(async () => {
  await store.fetchLogs()
})

const route = useRoute()
const id = route.params.id

const store = useMainStore()
const log = store.logById(id)

</script>

<style lang="sass" scoped>

</style>
