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
const filePath = ref(null)
const fileType = ref(null)

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
    const filePathUnique = `${fileName}-${Date.now()}.${fileExt}`
    fileType.value = file.type
    const { data, error: uploadError } = await sb.storage
      .from('media')
      .upload(filePathUnique, file)
    if (uploadError) throw uploadError
    const key = data.Key
    // getPublicUrl() is somehow not working for me, see https://github.com/supabase/supabase/issues/2908#issuecomment-911449014
    const baseURL = import.meta.env.VITE_SUPABASE_URL.toString().replace('.co', '.in')
    filePath.value = `${baseURL}/storage/v1/object/public/${key}`
  } catch (error) {
    console.error(error.message)
    store.sendMessage(
      'Ups! Something went wrong :(',
      'We couldn\'t upload your video, please try again.',
      store.messageTypes.DANGER.id
    )
  } finally {
    uploading.value = false
  }
}

// TODO could be reused for the other functions and should be in store
async function onCreate () {
  const { error } = await sb
    .from('log_entries')
    .insert([
      {
        type: store.entryTypes.VIDEO.id,
        title: title.value,
        location: location.value,
        chronological: chronological.value,
        file_path: filePath.value,
        file_type: fileType.value,
        logs_id: logId.value
      }
    ])
  if (error) {
    console.error(error)
    store.sendMessage(
      'Ups! Something went wrong :(',
      'Please try it again.',
      store.messageTypes.DANGER.id
    )
  } else {
    store.sendMessage(
      'New Entry created!',
        `Congratulations you created the video entry "${title.value}".`,
        store.messageTypes.SUCCESS.id
    )
    title.value = ''
    location.value = ''
    chronological.value = ''
    filePath.value = ''
    fileType.value = ''
  }
}

// Form: Validation
const isValid = computed(() => !!logId.value && !!title.value && !!location.value && !!chronological.value && !!filePath.value)

</script>

<style lang="sass" scoped>
</style>
