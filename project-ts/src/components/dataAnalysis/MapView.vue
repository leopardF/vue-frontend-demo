<template>
    <div class="map-view">
        <div id="main"></div>
    </div>
</template>
<script>
import geoJson from '@/assets/mapdata.json'
export default {
    data() {
        return {

        }
    },
    mounted() {
        let mychart = this.$echarts.init(document.getElementById('main'))
        this.$echarts.registerMap("china", geoJson) //注册可用的地图，必须包括geo组件或者map图表类型的时候才可以使用
        let option = {
            backgroundColor: '#549de9',
            geo: {
                map: 'china',
                aspectScale: 0.75, //scale地图长宽比
                zoom: 1.1, //缩放比
                regions: [{
                    name: '南海诸岛'
                }],
                // itemStyle: {
                //     normal: {
                //         areaColor: {
                //             type: 'radial', //径向渐变
                //             x: 0.5,
                //             y: 0.5,
                //             r: 0.8,
                //             colorStops:[
                //                 {
                //                     offset: 0,
                //                     color: '#09132c' // 0%处的颜色
                //                 },
                //                 {
                //                     offset: 1,
                //                     color: '#274d68' // 100%处的颜色
                //                 }
                //             ],
                //             globalCoord: true
                //         }
                //     }
                // }
            },
            series: [{
                //配置地图相关参数，绘制地图，这个对象是关于地图图表的相关设置
                type: 'map',
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            color: '#1DE9B6'
                        }
                    },
                    emphasis: {
                        areaColor: 'rgb(183,185,14)'
                    }
                },
                zoom: 1.1,
                map: 'china',
                itemStyle: {
                    normal: {
                        backgroundColor: 'rgb(147,235,248)',
                        borderWidth: 1,
                        areaColor: {
                            type: 'radial', //径向渐变
                            x: 0.5,
                            y: 0.5,
                            r: 0.8,
                            colorStops:[
                                {
                                    offset: 0,
                                    color: 'rgb(31,54,150)' // 0%处的颜色
                                },
                                {
                                    offset: 1,
                                    color: 'rgb(89,128,142)' // 100%处的颜色
                                }
                            ],
                            globalCoord: true
                        },
                        shadowColor: 'rgb(58, 115, 192)',
                        shadowOffsetX: 10,
                        shadowOffsetY: 11,
                    },
                    emphasis: {
                        areaColor: 'rgb(49,229,206)',
                        borderWidth: 0.1
                    }
                }
            }]
        }
        mychart.setOption(option)
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