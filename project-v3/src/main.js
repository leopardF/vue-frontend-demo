import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/es/locale/lang/zh-cn'
import axios from 'axios'
import router from './router'

const app = createApp(App)
app.config.globalProperties.$https = axios
app.use(router).use(ElementPlus, {locale}).mount('#app')
