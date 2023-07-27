<template>
    <p :style="{color: activeColor , fontSize: fontSize + 'px'}">style1 绑定参数</p>
    <p :style="styleObject">style2 绑定对象</p>
    <p :style="[styleObject,styleObject2]">style3 绑定数组，非必要</p>
</template>

<script>
export default {
    data() {
        return {
            activeColor:'green',
            fontSize:30,
            styleObject:{
                color:'blue',
                fontSize:'24px'
            },
            styleObject2:{
                color:'red',
                fontSize:'24px'
            }
        }
    }
}
</script>

