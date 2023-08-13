<template>
    <div class="homeworkList">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
            <el-form-item label="作业">
                <el-input v-model="formInline.searchName" placeholder="请输入作业查询"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="findHomeword">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="resetCondition">重置</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" v-loading="loading" border style="width: 100%">
            <el-table-column prop="id" label="ID" align="center">
            </el-table-column>
            <el-table-column prop="userId" label="用户ID-所属班级" align="center">
            </el-table-column>
            <el-table-column prop="title" label="作业名称" align="center">
            </el-table-column>
            <el-table-column prop="completed" label="完成情况" align="center" :formatter="completedText">
            </el-table-column>
            <!-- <el-table-column label="操作" align="center" >
                <template slot-scope="scope">
                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeData(scope.row)"></el-button>
                </template>
            </el-table-column> -->
        </el-table>
        <Pageing :pageStart="pageStart" :total="total" :formInline="formInline" @getData="getData"/>
    </div>
</template>
<script setup>

import { getHomeWorkList } from '@/api/students/workList.js'
import { reactive,ref, onMounted } from 'vue';
import Pageing from '../common/Pageing.vue'
const tableData = ref([]);
const pageStart = ref(1);
const total = ref(0);
const formInline = reactive({
    searchName: ''
});
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

const findHomeword = () => {
    getData(formInline);
}
const resetCondition = () => {
    formInline.searchName = '';
    getData(formInline);
}
const completedText = (row, cloumn) => {
    return row.completed ? '是' : '否';
}
</script>


<style lang="scss" scoped>
.homeworkList {
    .el-pagination {
        text-align: center;
        margin-top: 20px;
    }
    .el-form-item ,.demo-form-inline{
        text-align: left;
    }
}
</style>