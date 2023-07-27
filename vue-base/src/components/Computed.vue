<template>
    <h3>{{jsonobject.name}} </h3>
    <p>{{ jsonContent }}</p>
    <p>{{ jsonContents() }}</p>
</template>

<script>
export default {
    data() {
        return {
            jsonobject:{
                name:"测试人员1",
                content:["标签1","标签2","标签3"]
            }
        }
    },
    methods: {
        jsonContents(){
            return this.jsonobject.content.length > 0 ? 'YES':'NO';
        }
    },
    //计算属性
    computed:{
        jsonContent(){
            return this.jsonobject.content.length > 0 ? 'YES':'NO';
        }
    }
}
</script>