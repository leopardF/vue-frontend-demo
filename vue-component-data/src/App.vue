
<template>
  <h3>祖宗</h3>
  <Parent/>
</template>

<script>
import Parent from './components/Parent.vue'
export default{
  data(){
    return{
      message3:"祖宗的财产3"
    }
  },
  components:{
    Parent
  },
  // provide:{
  //   message: "祖宗的财产2"
  // }
  provide(){
    return {
      message : this.message3
    }
  }
}
</script>

<style scoped>

</style>
