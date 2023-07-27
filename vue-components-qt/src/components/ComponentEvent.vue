<template>
    <h3>组件事件</h3>
    <ComponentChild @someEvent="getHandle"/>
    <p>{{ message }}</p>
</template>

<script>

import ComponentChild from './ComponentChild.vue';
export default{
    data(){
        return{
            message:""
        }
    },
    components:{
        ComponentChild
    },
    methods:{
        getHandle(data){
            console.log("触发了",data);
            this.message = data
        }
    }
}
</script>