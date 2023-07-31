import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/es/locale/lang/zh-cn'
import axios from 'axios'
import router from './router'
import 'font-awesome/css/font-awesome.min.css';
import service from './service'
import * as echarts from 'echarts';

const app = createApp(App)
app.config.globalProperties.$https = axios
app.config.globalProperties.service = service
app.config.globalProperties.$echarts = echarts


//路由导航守卫
router.beforeEach((to, from, next) => {
    if (!localStorage.getItem("token")) {
        if (to.path !== '/login') {
            next('/login')
        } else {
            next()
        }
    } else {
        next()
    }
})

app.use(ElementPlus, { locale }).use(router).mount('#app')
