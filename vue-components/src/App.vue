
<template>
<!-- 第三步：显示组件 -->
<!-- <MyComponent /> -->
<!-- <my-component /> -->

<SwiperSlide/>
</template>

<script>
//第一步：引入组件
// import MyComponent from './components/MyComponent.vue'

import SwiperSlide from './components/SwiperSlide.vue';

export default{
  //第二步： 注入组件
  components:{
    // MyComponent,
    SwiperSlide
  }
}
</script>

<style>

</style>
