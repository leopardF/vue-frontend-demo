import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    counter : 0
  },
  getters: {
    getCounter(state){
      return state.counter > 0 ? state.counter : "state 小于等于 0 "
    }
  },
  mutations: {
    addCounter(state , number){
      state.counter += number
    }
  },
  //为异步操作所准备的
  actions: {
    asyncAddCounter({commit}){
      axios.get("http://iwenwiki.com/api/generator/list.php").then(res=>{
        commit("addCounter",res.data[0])
      })
    }
  },
  modules: {
  }
})
