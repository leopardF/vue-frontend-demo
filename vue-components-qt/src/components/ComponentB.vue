<template>
    <h3>ComponentB</h3>
    <p>{{ title }}</p>
    <p>{{ age }}</p>
    <p>{{ userInfo.age }}</p>
    <p v-for="(item,index) of names" :key="index">{{ item }}</p>
</template>

<script>

export default{
    data(){
        return{

        }
    },
    props:{
        //PS：就算加校验也只是警告提示
        //PS: props 不允许修改父元素传递过来的数据，只读
        title: {
            type:[String,Number,Array,Object],
            //必选项
            required: true
        },
        age:{
            type:Number,
            default: 12
        },
        //数字和字符串可以直接使用default，但是如果是数组和对象，必须通过工厂函数返回默认值
        userInfo:{
            type:Object,
            default: {age:20}
        },
        names:{
            type: Array,
            default(){
                return ["空"]
            }
        }
    }
}
</script>