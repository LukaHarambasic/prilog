<template>
  <section>
    <h1 v-if="log">{{ log.title }}</h1>
    <ul v-if="log">
      <li
        v-for="entry in log.log_entries"
        :key="entry.id"
      >
        <component :is="currentComponent(entry.type)" :entry="entry" />
      </li>
    </ul>
    <div v-else>
      No log found O.o
    </div>
  </section>
</template>

<script setup>
import { useMainStore } from '@/store'
import { defineAsyncComponent, onBeforeMount, ref} from 'vue'
import { useRoute } from 'vue-router'

const store = useMainStore()

const route = useRoute()
const {id} = route.params

const log = ref(null)

onBeforeMount(async () => {
  await store.fetchLogs()
  log.value = store.logs.find(log => log.id === id)
})

const types = store.types

function currentComponent (type) {
  switch (type) {
    case types.IMAGE.id:
      return defineAsyncComponent(() => import('@/components/LogsDetails/LogsDetailsEntryImage.vue'))
    case types.LOCATION.id:
      return defineAsyncComponent(() => import('@/components/LogsDetails/LogsDetailsEntryLocation.vue'))
    case types.MARKDOWN.id:
      return defineAsyncComponent(() => import('@/components/LogsDetails/LogsDetailsEntryMarkdown.vue'))
    case types.VIDEO.id:
      return defineAsyncComponent(() => import('@/components/LogsDetails/LogsDetailsEntryVideo.vue'))
    default:
      return defineAsyncComponent(() => import('@/components/LogsDetails/LogsDetailsEntryMarkdown.vue'))
  }
}
</script>

<style lang="sass" scoped>

</style>
