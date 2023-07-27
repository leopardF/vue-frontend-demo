
<template>
  <!-- <UserComponent/> -->
  <!-- <ComponentA/>
  <ComponentB/> -->
  <KeepAlive>
    <component :is="tabComponent"></component>
  </KeepAlive>
  <button @click="changeHandle">切换组件</button>
</template>
<script>

// import UserComponent from './components/UserComponents.vue'
import ComponentA from './components/ComponentA.vue';
// import ComponentB from './components/ComponentB.vue';

import {defineAsyncComponent} from 'vue'
const ComponentB = defineAsyncComponent(() => 
  import('./components/ComponentB.vue')
)
export default {
  data(){
    return{
      tabComponent:"ComponentA"
    }
  },
  components:{
    // UserComponent
    ComponentA,
    ComponentB
  },
  methods:{
    changeHandle(){
      this.tabComponent = this.tabComponent == "ComponentA" ? "ComponentB" : "ComponentA";
    }
  }
}
</script>

<style></style>
