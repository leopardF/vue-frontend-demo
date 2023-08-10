import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {  //类似于 vue 中的 data，用于存放数据模型
    counter : 0
  },
  getters: {  //类似于 vue 中 computed，相当于 state 的计算属性
    getCounter(state){
      return state.counter > 0 ? state.counter : "state 小于等于 0 "
    }
  },
  mutations: {  //类似于 vue 中的 method，只有通过它的方法函数可以改变 state 的值，而且，它的方法函数必须是同步，不能是异步
    addCounter(state , number){
      state.counter += number
    }
  },
  //为异步操作所准备的,只能通过它来调用 mutations 来改变 state 的值，它的函数方法可以是异步的
  actions: {
    asyncAddCounter({commit}){
      axios.get("http://iwenwiki.com/api/generator/list.php").then(res=>{
        commit("addCounter",res.data[0])
      })
    }
  },
  modules: {  //可以引入多个 module，通过这个属性，可以添加多个 module 进入 Vuex 的 store 中
  }
})
