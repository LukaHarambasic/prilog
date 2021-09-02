<template>
  <section>
    <h1>Create new entry</h1>
    <form>
      <div class="field">
        <select
          v-model="selectedType"
        >
          <option
            value=""
            disabled
            selected
          >
            Select a Type
          </option>
          <option
            v-for="type in store.entryTypes"
            :key="type.id"
            :value="type.id"
          >
            {{ type.display }}
          </option>
        </select>
      </div>
      <div class="field">
        <select
          v-model="selectedLogId"
        >
          <option
            value=""
            disabled
            selected
          >
            Select a Log
          </option>
          <option
            v-for="log in logs"
            :key="log.id"
            :value="log.id"
          >
            {{ log.title }}
          </option>
        </select>
      </div>
    </form>
    <keep-alive>
      <component :is="selectedComponent" :logId="selectedLogId"/>
    </keep-alive>
  </section>
</template>

<script setup>
import { computed, defineAsyncComponent, onMounted, ref } from 'vue'
import { sb } from '@/assets/js/supabase'
import { useMainStore } from '@/store'

const store = useMainStore()

// Types
const selectedType = ref('')
const selectedComponent = computed(() => {
  // TODO default should also be reflected in the dropdown
  switch (selectedType.value) {
    case store.entryTypes.IMAGE.id:
      return defineAsyncComponent(() => import('@/components/Admin/Create/AdminCreateEntryImage.vue'))
    case store.entryTypes.LOCATION.id:
      return defineAsyncComponent(() => import('@/components/Admin/Create/AdminCreateEntryLocation.vue'))
    case store.entryTypes.MARKDOWN.id:
      return defineAsyncComponent(() => import('@/components/Admin/Create/AdminCreateEntryMarkdown.vue'))
    case store.entryTypes.VIDEO.id:
      return defineAsyncComponent(() => import('@/components/Admin/Create/AdminCreateEntryVideo.vue'))
    default:
      return defineAsyncComponent(() => import('@/components/Admin/Create/AdminCreateEntryMarkdown.vue'))
  }
})

// Logs
// TODO should go in store
// TODO should be set initially for the dropdown with the log was updated the last time
const selectedLogId = ref('')
const logs = ref([])
// TODO should happen in store
onMounted(async () => {
  const { data, error } = await sb
    .from('logs')
    .select()
  if (error) {
    console.log(error)
  } else {
    logs.value = data
  }
})

</script>

<style lang="sass" scoped>

</style>
