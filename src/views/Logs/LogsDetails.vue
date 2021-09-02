<template>
  <header
    v-if="log"
    class="header"
  >
    <h1
      v-if="log"
      class="title"
    >
      {{ log.title }}
    </h1>
    <p
      v-if="log"
      class="description"
    >
      {{ log.description }}
    </p>
  </header>
  <ul
    v-if="log"
    class="log"
  >
    <li
      v-for="entry in log.log_entries"
      :key="entry.id"
      class="entry"
    >
      <component
        :is="currentComponent(entry.type)"
        :entry="entry"
      />
    </li>
  </ul>
  <div v-else>
    No log found O.o
  </div>
</template>

<script setup>
import { useMainStore } from '@/store'
import { defineAsyncComponent, onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'

const store = useMainStore()

const route = useRoute()
const { id } = route.params

const log = ref(null)

onBeforeMount(async () => {
  await store.fetchLogs()
  log.value = store.logs.find(log => log.id === id)
})

function currentComponent (type) {
  switch (parseInt(type)) {
    case store.entryTypes.IMAGE.id:
      return defineAsyncComponent(() => import('@/components/LogsDetails/LogsDetailsEntryImage.vue'))
    case store.entryTypes.LOCATION.id:
      return defineAsyncComponent(() => import('@/components/LogsDetails/LogsDetailsEntryLocation.vue'))
    case store.entryTypes.MARKDOWN.id:
      return defineAsyncComponent(() => import('@/components/LogsDetails/LogsDetailsEntryLocation.vue'))
    case store.entryTypes.VIDEO.id:
      return defineAsyncComponent(() => import('@/components/LogsDetails/LogsDetailsEntryVideo.vue'))
    default:
      return defineAsyncComponent(() => import('@/components/LogsDetails/LogsDetailsEntryMarkdown.vue'))
  }
}
</script>

<style lang="sass" scoped>
.header
  background: #eeeeee
  padding: 2rem
  border-radius: .25rem
  margin: 0 0 4rem 0
  .title
    margin: 0 0 .5rem 0
.log
  list-style: none
  margin: 0
  padding: 0
  .entry
    margin: 0 0 4rem 0
    &:last-of-type
      border: none
</style>
