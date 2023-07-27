
<template>
    <h3>插槽Slot续集</h3>
    <slot name="header">默认内容</slot>
    <hr>
    <slot name="content">默认内容</slot>
</template>

<script>

export default{
    data(){
        return{
            message:""
        }
    }
}
</script>

<style scoped>

</style>
