import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import './plugins/element.js';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios'
import service from './service.js';
import * as echarts from 'echarts';


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.prototype.axios = axios   //挂载到原型就可以全局使用
Vue.prototype.service = service
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false;
 
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
