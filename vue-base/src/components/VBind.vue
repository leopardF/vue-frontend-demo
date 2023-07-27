<template>

<div v-bind:id="dynamicId" v-bind:class="dynamiclass">测试</div>
<div :id="dynamicId" :class="dynamiclass">测试</div>
<button :disabled="isButtonDisable">Button</button>
<div v-bind="objectOfAttrs">对象型绑定</div>
</template>


<script>
export default{
    data() {
        return{
            dynamiclass:"helloworld",
            dynamicId:"appid",
            isButtonDisable:true,
            objectOfAttrs:{
                id:"appidAttr",
                class:"helloworld"
            }
        }
    }
}
</script>

<style>
.helloworld{
    color : red
}
</style>