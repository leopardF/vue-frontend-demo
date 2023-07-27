import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import axios from 'axios'

//将Axios 挂载到全局
const app = createApp(App)

app.config.globalProperties.$axios = axios

app.mount('#app')
