<template>
  <section>
    <h2>Markdown</h2>
    <form>
      <div class="field">
        <label for="title">Title</label>
        <input
          id="title"
          v-model="title"
          type="text"
          name="title"
        >
      </div>
      <div class="field">
        <label for="location">Where did this happen?</label>
        <input
            id="location"
            v-model="location"
            type="text"
            name="location"
        >
      </div>
      <div class="field">
        <label for="chronological">When did this happen?</label>
        <input
          id="chronological"
          v-model="chronological"
          type="datetime-local"
          name="chronological"
        >
      </div>
      <div class="field">
        <label for="markdown">What did you want to write?</label>
        <textarea
          id="markdown"
          v-model="markdown"
          name="markdown"
        />
      </div>
      <div class="field">
        <input
          :disabled="!isValid"
          type="submit"
          value="Submit"
          @click.prevent="onCreate()"
        >
      </div>
    </form>
  </section>
</template>

<script setup>
import { ref, defineProps, toRefs, computed } from 'vue'
import { useMainStore } from '@/store'
import { sb } from '@/assets/js/supabase'

const store = useMainStore()

// Props
const props = defineProps({
  logId: {
    type: String,
    default: ''
  }
})
const { logId } = toRefs(props)

// Form: Fields
const title = ref('')
const location = ref('')
const chronological = ref('')
const markdown = ref('')

// Form: Create new log entry
async function onCreate () {
  // store
  const { data, error } = await sb
    .from('log_entries')
    .insert([
      {
        type: store.entryTypes.MARKDOWN.id,
        title: title.value,
        location: location.value,
        chronological: chronological.value,
        markdown: markdown.value,
        logs_id: logId.value
      }
    ])
  if (error) {
    console.log('ERROR')
    console.log(error)
  } else {
    console.log(data)
  }
}

// Form: Validation
const isValid = computed(() => !!logId.value && !!title.value && !!location.value && !!chronological.value && !!markdown.value)

</script>

<style lang="sass" scoped>
</style>
