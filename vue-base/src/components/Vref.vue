<template>
    <h3>模板引用，使用ref获取DOM操作</h3>
    <div ref="container" class="container">容器</div>
    <input type="text" ref="username"/>
    <button @click="getElementHandle">获取数据</button>
</template>
    
<script>
/**
 * 内容改变:{[ 模板语法 }]
 * 属性改变:v-bind: 指令
 * 事件:v-on:click
 * 
 * !!! 如果没有特别的需求，不要操作DOM
 */
export default {
    data() {
        return {
            content:"内容",
            checked: true
        }
    },
    methods:{
        getElementHandle(){
            //innerHTML 原生JS的属性
            this.$refs.container.innerHTML = "哈哈哈哈";
            console.log(this.$refs.username.value);
        }
    }
}
</script>