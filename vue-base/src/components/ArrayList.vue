<template>
    <h3>数据变化监听 </h3>
    <button @click="addListHandle">添加数据</button>
    <ul>
        <li v-for="(item, index) in names " :key="index">{{ item }}</li>
    </ul>
    <h3>数组1 </h3>
    <button @click="concathandle">合并数组</button>
    <ul>
        <li v-for="(item, index) in number1 " :key="index">{{ item }}</li>
    </ul>
    <h3>数组2 </h3>
    <button @click="addListHandle">添加数据</button>
    <ul>
        <li v-for="(item, index) in number2 " :key="index">{{ item }}</li>
    </ul>
</template>

<script>
export default {
    data() {
        return {
            names: ["张三", "李四", "王五"],
            number1: [1,2,3,4,5],
            number2: [6,7,8,9,10]
        }
    },
    methods: {
        addListHandle() {
            //引起UI自动更新
            // this.names.push("腾六")
            //不会引起UI自动更新
            this.names.concat(["腾六2"])
            console.log(this.names.concat(["腾六2"]))
            // this.names = this.names.concat(["腾六2"])
        },
        concathandle(){
            this.number1 = this.number1.concat(this.number2)
        }
    }
}
</script>