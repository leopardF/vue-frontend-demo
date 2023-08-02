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
        <Pageing :tableData="tableData" :total="total" :url="getTableDataUrl" :loading="loading"/>
    </div>
</template>
<script setup>
import Pageing from '../common/Pageing.vue'
import { reactive, ref } from 'vue'
const tableData = ref([]);
const total = ref(0);
const getTableDataUrl = '/v1/homework/getHomeworkList';
const loading = ref(true)
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