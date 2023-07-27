
<template>
    <h3>Child</h3>
    <p>{{ message }}</p>
    <p>{{ fullMessage }}</p>
    <p>{{ golapData }}</p>
</template>

<script>
export default{
  data(){
    return{
      fullMessage : this.message
    }
  },
  props:{
    title:{
        type:String
    }
  },
  inject:["message","golapData"]
}
</script>

<style scoped>

</style>
