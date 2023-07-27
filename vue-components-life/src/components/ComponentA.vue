<template>
    <h3>ComponentA</h3>
    <p>{{ message }}</p>
    <button @click="updateHandle">更新数据</button>
</template>

<script>

export default{
    data(){
        return{
            message:"old value"
        }
    },
    beforeUnmount(){
        console.log("组件被卸载之前");
    },
    unmounted(){
        console.log("组件被卸载之后");
    },
    methods:{
        updateHandle(){
            this.message = "new value"
        }
    }
}
</script>