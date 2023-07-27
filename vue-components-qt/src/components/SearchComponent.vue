<template>
    <!-- <h3>Search</h3> -->
    Search : <input type="text" v-model="search"/>
    <!-- <p>{{ search }}</p> -->
</template>

<script>

export default{
    data(){
        return{
            search:""
        }
    },
    //侦听器
    watch:{
        search(newValue, oldValue){
            this.$emit("searchEvent",newValue);
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