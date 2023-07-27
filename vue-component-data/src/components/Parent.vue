
<template>
    <h3>Parent</h3>
    <p>{{ golapData }}</p>
    <Child/>
</template>

<script>
import Child from './Child.vue'
export default{
  data(){
    return{
      
    }
  },
  components:{
    Child
  },
//   props:{
//     title:{
//         type:String
//     }
//   }
  inject:["golapData"]
}
</script>

<style scoped>

</style>
