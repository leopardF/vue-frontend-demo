<template>
    <swiper
    :modules="modules" :pagination="{clickable:true}"
      :space-between="50"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide><img src="../assets/zm3.jpg"></swiper-slide>
      <swiper-slide><img src="../assets/zm3.jpg"></swiper-slide>
      <swiper-slide><img src="../assets/zm3.jpg"></swiper-slide>
    </swiper>
  </template>
  <script>
    // Import Swiper Vue.js components
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import { Pagination } from 'swiper/modules';
  
    // Import Swiper styles
    import 'swiper/css';
    import 'swiper/css/pagination';
  
    export default {
      components: {
        Swiper,
        SwiperSlide,
      },
      data(){
        return{
            modules: [Pagination]
        }
      },
      setup() {
        const onSwiper = (swiper) => {
          console.log(swiper);
        };
        const onSlideChange = () => {
          console.log('slide change');
        };
        return {
          onSwiper,
          onSlideChange,
        };
      },
    };
  </script>