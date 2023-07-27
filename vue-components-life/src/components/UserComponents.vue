
<template>
    <h3>组件的生命周期函数应用</h3>
    <p ref="name">程序员</p>
    <ul>
        <li v-for="(item, index) in banner" :key="index">
            <h3>{{ item.title }}</h3>
            <p>{{ item.content }}</p>
        </li>
    </ul>
</template>
<script>


export default {
    data() {
        return {
            banner: []
        }
    },
    // created() {
    // },
    beforeMount() {
        console.log(this.$.refs.name) //undefined
    },
    mounted() {
        // console.log(this.$.refs.name)
        
        this.banner = [{
            "title": "我在爱尔兰",
            "content": "爱尔兰(爱尔兰语: poblacht na hEireann; 英语:Republic of Ireland)，是一个"
        }, {
            "title": "一个人的东京",
            "content": "东京(Tokyo)是日本国的首都，是亚洲第一大城市，世界第二大城市。全球最大的经济中心"
        }, {
            "title": "普罗旺斯的梦",
            "content": "普罗旺斯(Provence)位于法国东南部，毗邻地中海和意大利，从地中海沿岸延伸到内陆的"
        }, {
            "title": "相约夏威夷之夏",
            "content": "夏威夷州位于北太平洋中，距离美国本土3,700公里，总面积16,633平方公里，属"
        }]
    }
}
</script>
  
<style></style>
  