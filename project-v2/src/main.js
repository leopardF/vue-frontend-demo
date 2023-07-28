import Vue from 'vue';
import App from './App.vue';
import './plugins/element.js';
import 'font-awesome/css/font-awesome.min.css';
// import axios from 'axios'
import router from './router';
import service from './service';
import * as echarts from 'echarts';

// Vue.prototype.axios = axios   //挂载到原型就可以全局使用
Vue.prototype.service = service
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

//路由导航守卫
router.beforeEach((to,from, next) => {
  if(!localStorage.getItem("token")){
    if(to.path !== '/login'){
      next('/login')
    } else next()
  } 
  next()
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')




// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);

// import { Button, Tag } from 'element-ui';
// Vue.use(Button);
// Vue.use(Tag);