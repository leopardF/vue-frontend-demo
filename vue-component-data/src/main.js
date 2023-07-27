// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

// const app = createApp(App)

// app.provide("golapData" ,"我是全局数据")

// app.mount('#app')

// app : vue 的实例对象
// 在一个VUE项目中，有且只有一个实例对象
const app = createApp(App)

// APP：根组件

app.mount('#app')