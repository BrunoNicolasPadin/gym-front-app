import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import "primevue/resources/themes/tailwind-light/theme.css"
import 'primeicons/primeicons.css'
import router from './router.js'
import { TailwindPagination } from 'laravel-vue-pagination'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)
app.use(PrimeVue)
app.use(router)
app.use(pinia)
app.component('TailwindPagination', TailwindPagination);
app.mount('#app')
