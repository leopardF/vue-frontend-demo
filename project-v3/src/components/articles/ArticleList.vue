<template>
    <div class="articleInfoList">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
            <el-form-item label="文章名"  prop="searchName">
                <el-input v-model="formInline.searchName" autocomplete="off" placeholder="文章名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
                <el-button type="primary" @click="addArticleInfo">新增</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="title" label="标题" align="center" width="150"></el-table-column>
            <el-table-column prop="bannerPic" label="banner" align="center" width="300">
                <!-- <template #default="scope">
                    <img :src="require(scope.row.bannerPic)" alt="Image" width="50" height="50" />
                </template> -->
            </el-table-column>
            <el-table-column prop="content" label="内容" align="center" width="300"></el-table-column>
            <el-table-column prop="fileName" label="文件名" align="center" width="150"></el-table-column>
            <el-table-column prop="publishTime" label="发布时间" align="center" width="160" :formatter="formatDateText"></el-table-column>
            <el-table-column prop="isDisable" label="是否禁用" align="center" width="150" :formatter="disableText"></el-table-column>
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
import {
  Check,Delete,Edit,Message,Search,Star,
} from '@element-plus/icons-vue'
import { getTableData, addInfo,updateInfo,delData,getDataByUrl } from '@/api/table.js'
import {ElMessage} from "element-plus";
import { onMounted, reactive, ref} from 'vue'
import { useRouter } from 'vue-router'
import { formatDate } from '@/utils/format.js'
const router = useRouter();
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
    Object.assign(form, initForm);
    router.push({path:"/home/articleDetail", query: { state: state.value } });
}

const editData = (row) => {
    state.value = false;
    // Object.assign(form, row);
    console.log("state" , state.value)
    router.push({path:"/home/articleDetail", query: { articleInfoId: row.id , state: state.value } })
}
const disableText = (row, cloumn) => {
    return row.isDisable ? '禁用' : '启用';
}
const formatDateText = (row, column) => {
    let data = row.publishTime;
    return formatDate(data);
};

const search = () => {
    loading.value = true;
    getTableData(tableData, total, getTableDataUrl, formInline);
    loading.value = false;
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