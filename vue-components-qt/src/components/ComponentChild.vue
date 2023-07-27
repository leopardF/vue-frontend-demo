<template>
    <h3>Child</h3>
    <button @click="clickEventHandle">传递数据</button>
</template>

<script>

export default{
    data(){
        return{
            
        }
    },
    methods:{
        clickEventHandle(){
            // console.log("哈哈")
            //自定义事件
            this.$emit("someEvent", "Click数据")
        }
    }
}
</script>