import { createStore } from 'vuex'
import permit from './modules/permit'

export default createStore({
    //类似于 vue 中的 data，用于存放数据模型
  state: {  
  },
  //类似于 vue 中 computed，相当于 state 的计算属性
  getters: {  
  },
  //类似于 vue 中的 method，只有通过它的方法函数可以改变 state 的值，而且，它的方法函数必须是同步，不能是异步
  mutations: {  
  },
  //为异步操作所准备的,只能通过它来调用 mutations 来改变 state 的值，它的函数方法可以是异步的
  actions: {
    
  },
  modules: {  //可以引入多个 module，通过这个属性，可以添加多个 module 进入 Vuex 的 store 中
    permit
  }
})
