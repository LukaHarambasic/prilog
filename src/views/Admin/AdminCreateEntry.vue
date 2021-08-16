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
            v-for="type in types"
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
      <component :is="selectedComponent" />
    </keep-alive>
  </section>
</template>

<script setup>
import { computed, defineAsyncComponent, onMounted, ref } from 'vue'
import { TYPES as RAW_TYPES } from '@/assets/js/consts/types'
import { sb } from '@/assets/js/supabase'

// Types
const types = ref(RAW_TYPES)
const selectedType = ref('')
const selectedComponent = computed(() => {
  // TODO defualt should also be reflected in the dropdown
  switch (selectedType.value) {
    case types.value.IMAGE.id:
      return defineAsyncComponent(() => import('@/components/Admin/Create/AdminCreateEntryImage.vue'))
    case types.value.LOCATION.id:
      return defineAsyncComponent(() => import('@/components/Admin/Create/AdminCreateEntryLocation.vue'))
    case types.value.MARKDOWN.id:
      return defineAsyncComponent(() => import('@/components/Admin/Create/AdminCreateEntryMarkdown.vue'))
    case types.value.VIDEO.id:
      return defineAsyncComponent(() => import('@/components/Admin/Create/AdminCreateEntryVideo.vue'))
    default:
      return defineAsyncComponent(() => import('@/components/Admin/Create/AdminCreateEntryMarkdown.vue'))
  }
})

// Logs
// TODO should go in store
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
