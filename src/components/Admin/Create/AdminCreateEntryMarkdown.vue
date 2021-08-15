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
import { sb } from '@/assets/js/supabase'

// Props
const props = defineProps({
  logId: {
    type: String,
    required: true
  }
})
const { logId } = toRefs(props)

// Form: Fields
const title = ref('')
const markdown = ref('')
const chronological = ref('')

// Form: Create new log entry
async function onCreate () {
  // store
  const { data, error } = await sb
    .from('log_entries')
    .insert([
      {
        type: 3,
        title: title.value,
        markdown: markdown.value,
        chronological: chronological.value,
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
console.log(logId.value)
const isValid = computed(() => !!logId.value && !!title.value && !!markdown.value && !!chronological.value)

</script>

<style lang="sass" scoped>
</style>
