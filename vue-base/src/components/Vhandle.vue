<template>
<h3>内联事件处理器</h3>
<button @click="count++">Add 1</button>
<p>count is : {{ count }}</p>

<h3>方法事件处理器</h3>
<button @click="addCount">Add 1</button>
<p>count1 is : {{ count1 }}</p>
</template>

<script>
export default{
    data(){
        return{
            count: 0,
            count1: 0
        }
    },
    methods:{
        addCount(){
            // 读到data里面的数据的方案：this.count
            // 使用this可以读取data()return里面的数据
            this.count1 ++
        }
    }
}

</script>