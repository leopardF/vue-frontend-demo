<template>
    <div class="articleInfoList">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
            <el-form-item label="文章名" :label-width="formLabelWidth" prop="searchName">
                <el-input v-model="formInline.searchName" autocomplete="off" id="searchName" placeholder="文章名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
                <el-button type="primary" @click="addArticleInfo">新增</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" border style="width: 100%" @cell-click="toDetails">
            <el-table-column prop="title" label="标题" align="center" width="150"></el-table-column>
            <el-table-column prop="bannerPic" label="banner" align="center" width="300"></el-table-column>
            <el-table-column prop="content" label="内容" align="center" width="300"></el-table-column>
            <el-table-column prop="fileName" label="文件名" align="center" width="150"></el-table-column>
            <el-table-column prop="publicTime" label="发布时间" align="center" width="150"></el-table-column>
            <el-table-column prop="isDisable" label="是否禁用" align="center" width="150"></el-table-column>
            <el-table-column label="操作" align="center">
                <template #default="scope">
                    <el-button type="primary" size="small" :icon="Edit" @click="editData(scope.row)"></el-button>
                    <el-button type="danger" size="small" :icon="Delete" @click="removeData(scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageStart"
            :page-sizes="[5, 10, 20, 30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
</template>
<script setup>
import { getTableData, addInfo,updateInfo,delData,getDataByUrl } from '@/api/table.js'
import {ElMessage} from "element-plus";
import { onMounted, reactive, ref} from 'vue'
const tableData = ref([]);
const pageStart = ref(1);
const pageSize = ref(10);
const total = ref(0);
const formInline = reactive({
    searchName: ''
});
const getTableDataUrl = '/v1/articleInfo/getArticleInfoList';
const loading = ref(true);

const state = ref(true);
const dialogFormVisible = ref(false);
const initForm = {
    loginName: '',
    userName: '',
    telephone: '',
};
const form = reactive({...initForm});


onMounted(()=>{
    getTableData(tableData, total, getTableDataUrl);
    loading.value = false;
});
const handleSizeChange = (val) => {
    // console.log(`每页 ${val} 条`);
    pageSize.value = val;
    pageStart.value = 1;
    getTableData(tableData, total, getTableDataUrl, { pageSize: pageSize.value, pageStart: pageStart.value, formInline });
    loading.value = false;
};
const handleCurrentChange = (val) => {
    // console.log(`当前页: ${val}`);
    pageStart.value = val;
    getTableData(tableData, total, getTableDataUrl, { pageSize: pageSize.value, pageStart: pageStart.value, formInline });
    loading.value = false;
};
const removeData = (row) => {
    delData(tableData,total, "/v1/articleInfo/removeArticleInfoInfo", row.id, getTableData, getTableDataUrl)
};
const addArticleInfo = () => {
    state.value = true;
    dialogFormVisible.value = true;
    Object.assign(form, initForm);
}
</script>

<style scoped lang="scss">
.articleInfoList{
    width: 100%;
    .el-pagination {
        text-align: center;
        margin-top: 20px;
    }
    .el-form-item ,.demo-form-inline{
        text-align: left;
    }
}
</style>