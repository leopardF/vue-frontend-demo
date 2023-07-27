<template>
    <h3>ComponentA</h3>
    <ComponentB :title="title" :names="names"/>
</template>

<script>

import ComponentB from './ComponentB.vue';
export default{
    data(){
        return{
            title:"标题",
            names:["张三","李四"]
        }
    },
    components:{
        ComponentB
    }
}
</script>