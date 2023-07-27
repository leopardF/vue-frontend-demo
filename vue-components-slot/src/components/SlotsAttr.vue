<template>
    <h3>Slot再续集</h3>
    <slot name="header" :msg="childMessage"></slot>
    <slot name="main" :job="jobMessage"></slot>
</template>

<script>

export default{
    data(){
        return{
            childMessage:"子组件数据",
            jobMessage:"这是一批数据"
        }
    }
}
</script>