<template>
<h3>事件修饰符 </h3>
<a href="https://www.baidu.com" @click.prevent="clickHandle">百度一下</a>

<div @click="clickdiv">
    <p @click.stop="clickp">测试冒泡</p>

</div>
</template>

<script>
export default{
    data(){
        return{
            count1: 0,
            count2: 0
        }
    },
    methods:{
        clickHandle(e){
            // e.preventDefault();
            console.log("点击了");
        },
        clickdiv(event){
            console.log("div");
        },
        clickp(event){
            // event.stopPropagation();
            console.log("p");
        }
    }
}

</script>