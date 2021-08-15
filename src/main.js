import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

const app = createApp(App)

app.use(router)

app.use(createPinia())

// TODO: sample for global components
// import Butt from './components/Butt.vue'
// app.component('Butt', Butt)

app.mount('#app')
