import './assets/style.css'
import '@fontsource/inter/variable-full.css'

import { createApp } from 'vue'
import { createHead } from 'unhead'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createHead()

const app = createApp(App)
app.use(pinia)
app.use(router)

app.mount('#app')
