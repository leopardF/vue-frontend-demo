<template>
<h3>key添加到V-for</h3>
<div>
    <p v-for="(value ,index) of result1" :key="index">{{ value }}</p>
</div>
<div v-for="item of result2" :key="item.id">
    <p>{{ item.title }}</p>
    <p>{{ item.content }}</p>
</div>

</template>

<script>
export default{
    data(){
        return{
            result1:["内容1","内容2","内容3"],
            result2:[
                {
                    id:1,
                    title:"标题1",
                    content:"内容1"
                },
                {
                    id:2,
                    title:"标题2",
                    content:"内容2"
                }
            ]
        }
    }
}
</script>