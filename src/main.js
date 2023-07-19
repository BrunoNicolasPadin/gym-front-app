import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import "primevue/resources/themes/tailwind-light/theme.css"
import 'primeicons/primeicons.css'
import router from './router.js'

const app = createApp(App)
app.use(PrimeVue)
app.use(router)
app.mount('#app')
