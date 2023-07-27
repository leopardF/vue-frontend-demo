<template>

<div v-if="show">是否可以看到1</div>
<div v-else>是否可以看到2</div>

<div v-if="type === 'A' ">type 1 </div>
<div v-else-if="type === 'B' ">type 2 </div>
<div v-else-if="type === 'c' ">type 3 </div>
<div v-else>type 4 </div>
<div v-show="show">是否可以看到1</div>
</template>

<script>

export default{
    data(){
        return{
            show:true,
            type:'A'
        }
    }
}

</script>