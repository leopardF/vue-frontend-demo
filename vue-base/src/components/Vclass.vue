<template>
    <p :class="{'active':isActive , 'text-danger':hasError}">Class 样式绑定1 - 多个</p>
    <p :class="classObject">Class 样式绑定2 - 对象</p>
    <p :class="[arrActive,arrError]">Class 样式绑定3 - 数组</p>
    <p :class="[isActive ?'active' : '']">Class 样式绑定4 - 三元运算符</p>
    <p :class="[isActive ?'active' : '' , {'text-danger':hasError}]">Class 样式绑定5 - 数组嵌套对象，不能反其道</p>
</template>

<script>
export default {
    data() {
        return {
            isActive:true,
            hasError:false,
            classObject:{
                'active': true,
                'text-danger': true
            },
            arrActive: "active",
            arrError: "text-danger"
        }
    }
}
</script>

<style>
.active{
    font-size: 20px;
}
.text-danger{
    color:red;
    font-size: 30px;
}
</style>