<template>
    <div class="map-view">
        <div id="main"></div>
    </div>
</template>
<script>
import geoJson from '@/assets/mapdata.json'
import map from '@/utils/map.js'
import * as echarts from 'echarts'
import { onMounted } from 'vue'
export default {
    setup() {
        onMounted(() => {
            let mychart = echarts.init(document.getElementById('main'))
            echarts.registerMap("china", geoJson) //注册可用的地图，必须包括geo组件或者map图表类型的时候才可以使用
            let option = map
            mychart.setOption(option)
        })
    }

}
</script>
<style lang="scss" scoped>
.map-view {
    width: 100%;

    #main {
        width: 100%;
        height: 1000px;
    }
}
</style>