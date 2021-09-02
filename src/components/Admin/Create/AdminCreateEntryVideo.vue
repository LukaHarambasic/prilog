<template>
  <section>
    <h2>Video</h2>
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
      <div
        v-show="!uploading"
        class="field"
      >
        <label for="video">What video do you want to share?</label>
        <input
          id="video"
          name="video"
          type="file"
          accept="video/*"
          @change="onUpload($event)"
        >
      </div>
      <!-- TODO should be an overlay to avoid jumping -->
      <div
        v-show="uploading"
        class="field"
      >
        Uploading...
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
    required: true
  }
})
const { logId } = toRefs(props)

// Form: Fields
const title = ref('')
const location = ref('')
const chronological = ref('')

const uploading = ref(false)
const path = ref(null)

// Form: Upload video
async function onUpload (evt) {
  // TODO action in store
  // TODO make reusable for image
  try {
    uploading.value = true
    const file = evt.target.files[0]
    if (!file) {
      throw new Error('You must select an image to upload.')
    }
    const fileName = file.name.split('.')[0].replace(' ', '').toLowerCase()
    const fileExt = file.name.split('.')[1]
    const filePath = `${fileName}-${Date.now()}.${fileExt}`
    const { data, error: uploadError } = await sb.storage
      .from('media')
      .upload(filePath, file)
    if (uploadError) throw uploadError
    const key = data.Key
    console.log(key)
    // https://gkjykehhfdcaojaumiru.supabase.in/storage/v1/object/public/media/demo-1630574594757.mov
    const baseURL = import.meta.env.VITE_SUPABASE_URL.toString().replace('.co', '.in')
    path.value = `${baseURL}/storage/v1/object/public/${key}`
    console.log(path.value)
  } catch (error) {
    // TODO show error message
    console.error(error.message)
  } finally {
    uploading.value = false
  }
}

async function onCreate () {
  // todo store
  const { data, error } = await sb
    .from('log_entries')
    .insert([
      {
        type: store.entryTypes.VIDEO.id,
        title: title.value,
        location: location.value,
        chronological: chronological.value,
        file_path: path.value,
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
const isValid = computed(() => !!logId.value && !!title.value && !!location.value && !!chronological.value && !!path.value)

</script>

<style lang="sass" scoped>
</style>
