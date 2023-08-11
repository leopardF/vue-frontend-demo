<template>
    <div class="travel-view">
        <div id="main"></div>
    </div>
</template>
<script setup>
import geoJson from '@/assets/mapdata.json'
import { getTrabelView } from "@/api/dataAnalysis/dataAnalysis.js"
import map from '@/utils/map.js'
import * as echarts from 'echarts'
import { onMounted } from 'vue'
import { ElMessage } from 'element-plus';
onMounted(()=>{
    getTrabelView()
    .then(res => {
        if (res.data.code === 200) {
            let { points, linesData } = res.data.data;
            draw(points, linesData)
        } else {
            ElMessage({ message: '查询失败', type: 'error' })
        }
    })
    .catch(err => {
        throw err
    })
})


let draw = function(points, linesData) {
    let mychart = echarts.init(document.getElementById('main'))
    echarts.registerMap("china", geoJson) //注册可用的地图，必须包括geo组件或者map图表类型的时候才可以使用

    //关于地图中散点图的配置
    let optionObj = {
        type: 'effectScatter', //散点图
        coordinateSystem: 'geo', //坐标系
        showEffectOn: 'render', //绘制完成后显示特效
        symbolSize: 10, //散点大小
        zlevel: 1, //层级
        data: points,
        rippleEffect: { //涟漪特效相关配置
            period: 15,
            scale: 4,
            brushType: 'fill'
        }
    }
    //关于地图中线路动画效果设置
    let lineObj = {
        type: 'lines',
        zlevel: 2,
        effect: {
            show: true,
            period: 4,  //效果周期
            symbol: 'arrow',    //箭头样式
            symbolSize: '7',    //大小
            trailLength: 0.4    //拖尾效果
        },
        data: linesData,
        lineStyle: {
            normal: {
                color: '#1DE9B6',
                width: 1,   //线的宽度
                opacity: 0.1,   //透明度
                curveness: 0.3  //弯曲程度
            }
        }
    }
    map.series[1]  = optionObj 
    map.series[2]  = lineObj 
    let option = map
    mychart.setOption(option)
}
</script>
<style lang="scss" scoped>
.travel-view {
    width: 100%;

    #main {
        width: 100%;
        height: 1000px;
    }
}
</style>