import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import "tailwindcss/tailwind.css"
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"

createApp(App)
    .use(Toast)
    .use(store)
    .use(router).mount('#app')
