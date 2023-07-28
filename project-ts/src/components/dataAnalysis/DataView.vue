<template>
    <div class="data-view">
        <el-card>
            <div id="main1">

            </div>
        </el-card>
        <el-card>
            <div id="main2">

            </div>
        </el-card>
    </div>
</template>
<script>
import {getDataView} from "@/api/api.ts"
export default{
    data(){
        return{
            
        }
    },
    created() {
        getDataView()
        .then(res => {
            if(res.data.code === 200){
                let {legend, xAxis, series} = res.data.data;
                this.draw(legend, xAxis, series)
            }
        })
        .catch(err => {
            throw err
        })
    },
    mounted() {
        let myChart = this.$echarts.init(document.getElementById('main1'));
        myChart.setOption({
            title:{
                text:'进阶班'
            },
            tooltip:{

            },
            xAxis:{
                data:['一班','二班','三班','四班','五班','六班']
            },
            yAxis:{

            },
            series:[{
                name: '人数',
                type: 'bar',
                data: [45,42,46,48,52,47],
            }]
        })
    },
    methods:{
        draw(legend, xAxis, series){
            let mychart2 = this.$echarts.init(document.getElementById('main2'))
            let option = {
                title:{
                    text:'会话量'
                },
                tooltip:{
                    trigger: 'axis'
                },
                legend:{
                    data:legend
                },
                xAxis:{
                    type:'category',
                    data: xAxis
                },
                yAxis:{
                    type:'value'
                },
                series:series
            }
            mychart2.setOption(option)
        }
    }
}
</script>
<style scoped lang="scss">
.data-view{
    width: 100%;
    display: flex;
    justify-content: space-between;
    .el-card{
        width: 50%;
        #main1,#main2{
            height: 500px;
        }
    }
}
</style>