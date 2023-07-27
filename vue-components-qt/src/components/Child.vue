<template>
    <h3>Child</h3>
    <p>{{ title }}</p>
    <p>{{ age + 1}}</p>
    <ul>
        <li v-for="item in names">{{ item }}</li>
    </ul>
    <p>{{ userInfo.name }}</p>
    <p>{{ userInfo.age }}</p>
</template>

<script>
export default{
    data(){
        return{

        }
    },
    props:["title","age","names","userInfo"]
}
</script>