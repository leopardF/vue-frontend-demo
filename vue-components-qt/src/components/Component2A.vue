<template>
    <h3>Component2A</h3>
    <p>{{ message }}</p>
    <Component2B :title="title" :onEvent="dataFn"/>
</template>

<script>

import Component2B from './Component2B.vue';
export default{
    data(){
        return{
            title:"标题",
            message:""
        }
    },
    components:{
        Component2B
    },
    methods:{
        dataFn(data){
            console.log(data)
            this.message = data;
        }
    }
}
</script>