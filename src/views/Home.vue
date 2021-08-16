<template>
  <section>
    <h1>home</h1>
    <ul v-if="store.logs">
      <li
        v-for="log in store.logs"
        :key="log.id"
      >
        <router-link :to="`/logs/${log.id}`">
          {{ log.title }}
        </router-link>
      </li>
    </ul>
    <div v-else>
      No logs found O.o
    </div>
  </section>
</template>

<script setup>
import { useMainStore } from '@/store'
import { onMounted } from 'vue'

const store = useMainStore()

onMounted(async () => {
  await store.fetchLogs()
})

</script>

<style lang="sass" scoped>

</style>
