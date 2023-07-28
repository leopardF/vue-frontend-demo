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
        <Pageing :total="total" :url="getTableDataUrl"/>
    </div>
</template>
<script>
import Pageing from '../common/Pageing.vue'
export default {
    data() {
        return {
            tableData: [],
            total: 0,
            getTableDataUrl: '/v1/homework/getHomeworkList',
            loading: true
        }
    },
    methods: {
        completedText(row, cloumn) {
            return row.completed ? '是' : '否';
        }
    },
    components: {
        Pageing
    }
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