
<template>
  <p>{{ message }}</p>
</template>

<script>
// import axios from 'axios'
// import querystring from 'querystring'

import api from '../api/index'
export default{
  name:"HelloWorld",
  data(){
    return{
      message : ""
    }
  },
  mounted(){
    // this.$axios({
    //   method:"get",
    //   url:"http://iwenwiki.com/api/blueberrypai/getChengpinDetails.php"
    // }).then(res => {
    //   this.message = res
    //   // console.log(res.data)
    // })
    // axios.get("")
    // .then(res =>{

    // })

    
    // this.$axios({
    //   method:"post",
    //   url:"http://iwenwiki.com/api/blueberrypai/login.php",
    //   data:querystring.stringify({
    //     user_id:"iwen@qq.com",
    //     password:"iwen123",
    //     verification_code:"crfvw"
    //   })
    // }).then(res => {
    //   this.message = res
    //   console.log(res.data)
    // })
    // axios.post("",querystring.stringify({
    //     user_id:"iwen@qq.com",
    //     password:"iwen123",
    //     verification_code:"crfvw"
    //   })
    // ).then(res => {
    //   this.message = res
    //   console.log(res.data)
    // })
    api.getChengpin().then(res => {
      this.message = res
      // console.log(res.data)
    })
  }
}

</script>

<style scoped>

</style>
