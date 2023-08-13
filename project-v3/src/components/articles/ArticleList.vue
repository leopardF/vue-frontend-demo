<template>
    <div class="articleInfoList">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
            <el-form-item label="文章名"  prop="searchName">
                <el-input v-model="formInline.searchName" autocomplete="off" placeholder="文章名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
                <el-button type="primary" @click="resetCondition">重置</el-button>
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
        <Pageing :pageStart="pageStart" :total="total" :formInline="formInline" @getData="getData"/>
    </div>
</template>
<script setup>
import { Check,Delete,Edit,Message,Search,Star,} from '@element-plus/icons-vue'
import { getArticleInfoList, removeArticleInfo } from '@/api/articles/articles.js'
import {ElMessage,ElMessageBox} from "element-plus";
import { onMounted, reactive, ref} from 'vue'
import { useRouter } from 'vue-router'
import { formatDate } from '@/utils/format.js'
import Pageing from '../common/Pageing.vue'
const router = useRouter();
const tableData = ref([]);
const pageStart = ref(1);
const total = ref(0);
const formInline = reactive({
    searchName: ''
});
const loading = ref(true);

const state = ref(true);
const initForm = {
    loginName: '',
    userName: '',
    telephone: '',
};
const form = reactive({...initForm});

const getData = (params) => {
    loading.value = true;
    getArticleInfoList(params)
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

onMounted(()=>{
    getData();
    loading.value = false;
});

const removeData = (row) => {
    ElMessageBox.confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '关闭',
        type: 'warning',
    })
    .then(() => {
        removeArticleInfo({ id: row.id })
        .then(res => {
            if (res.data.code === 200 && res.data.data === true) {
                ElMessage({ message: '删除成功', type: 'success' })
                getData();
            }else{
                ElMessage({ message: '删除失败', type: 'error' })
            }
        })
    })
    .catch(() => {
        ElMessage({ message: '已取消', type: 'success' })
    })
};
const addArticleInfo = () => {
    state.value = true;
    Object.assign(form, initForm);
    router.push({path:"/home/articleDetail", query: { state: state.value } });
}

const editData = (row) => {
    state.value = false;
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
    getData(formInline);
}

const resetCondition = () => {
    formInline.searchName = '';
    getData(formInline);
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