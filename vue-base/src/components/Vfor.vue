
<template>

<div>
    <p v-for="item in names">{{ item }}</p>
</div>
<div>----------------------------------</div>
<div v-for="object in result">
    <p>{{ object.title }}</p>
    <p>{{ object.content }}</p>
</div>
<div>----------------------------------</div>
<div>
    <p v-for="(value , key ,index) in userInfo">{{ value }}-{{ key }}-{{ index }}</p>
</div>

</template>

<script>
export default{
    data(){
        return{
            names:["aaaaa","bbbb","cccc"],
            result:[
                {
                    title:"标题1",
                    content:"内容1"
                },
                {
                    title:"标题2",
                    content:"内容2"
                }
            ],
            userInfo:{
                name:"张三",
                age:20,
                height:173
            }
        }
    }
}
</script>