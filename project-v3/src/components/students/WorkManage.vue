<template>
    <div class="homeworkManage">

        <el-table :data="tableData" v-loading="loading" border style="width: 100%">
            <el-table-column prop="id" label="ID" align="center">
            </el-table-column>
            <el-table-column prop="userId" label="用户ID-所属班级" align="center">
            </el-table-column>
            <el-table-column prop="title" label="作业名称" align="center">
            </el-table-column>
            <el-table-column prop="completed" label="完成情况" align="center" :formatter="completedText">
            </el-table-column>
        </el-table>
        <Pageing :total="total" @getData="getData"/>
    </div>
</template>
<script setup>
import Pageing from '../common/Pageing.vue'
import { getHomeWorkList } from '@/api/students/workList.js'
import { ref, onMounted } from 'vue';
const tableData = ref([]);
const total = ref(0);
const loading = ref(true);

const getData = (params) => {
    loading.value = true;
    getHomeWorkList(params)
        .then(res => {
            // console.log(res)
            if (res.data.code === 200) {
                tableData.value = res.data.data.dataList
                total.value = res.data.data.total
            }else{
                ElMessage({ message: '查询失败', type: 'error' })
            }
        })
    loading.value = false;
}
onMounted(() => {
    getData();
    loading.value = false;
})

const completedText = (row, cloumn) => {
    return row.completed ? '是' : '否';
}

</script>

<style lang="scss" scoped>
.homeworkManage {
    .el-pagination {
        text-align: center;
        margin-top: 20px;
    }
    .el-form-item ,.demo-form-inline{
        text-align: left;
    }
}
</style>