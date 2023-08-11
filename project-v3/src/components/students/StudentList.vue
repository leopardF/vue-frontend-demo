<template>
    <div class="studentList">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
            <el-form-item label="姓名">
                <el-input v-model="formInline.name" placeholder="请输入姓名查询"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="findStudent">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="resetCondition">重置</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="name" label="姓名" align="center" width="100">
            </el-table-column>
            <el-table-column prop="age" label="年龄" align="center" width="68">
            </el-table-column>
            <el-table-column prop="sex" label="性别" align="center" width="68" :formatter="sexText">
            </el-table-column>
            <el-table-column prop="number" label="学号" align="center" width="120">
            </el-table-column>
            <el-table-column prop="clazz" label="班级" align="center" width="120">
            </el-table-column>
            <el-table-column prop="state" label="状态" align="center" width="100" :formatter="stateText">
            </el-table-column>
            <el-table-column prop="address" label="地址" align="center" width="300">
            </el-table-column>
            <el-table-column prop="phone" label="联系号码" align="center" width="150">
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template #default="scope">
                    <el-button type="danger" size="small" :icon="Delete" @click="removeData(scope.row)"></el-button>
                </template>
                <!-- <template slot-scope="scope">
                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeData(scope.row)"></el-button>
                </template> -->
            </el-table-column>
        </el-table>

        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageStart"
            :page-sizes="[5, 10, 20, 30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
</template>
<script setup>
import { Check, Delete, Edit, Message, Search, Star,} from '@element-plus/icons-vue'
import { getStudentList, removeStudent } from '@/api/students/infoList.js'
import { onMounted, reactive, ref} from 'vue'
import {ElMessage} from "element-plus";

let tableData = ref([]);
let pageStart = ref(1);
let pageSize = ref(10);
let total = ref(0);
let formInline = reactive({
    name: ''
})
const getData = (params) => {
    getStudentList(params)
        .then(res => {
            if (res.data.code === 200) {
                tableData.value = res.data.data.dataList;
                total.value = res.data.data.total;
            }
        })
}

onMounted(() => {
    getData()
})
const handleSizeChange = (val) => {
    // console.log(`每页 ${val} 条`);
    pageSize.value = val;
    pageStart.value = 1;
    getData({ pageSize: pageSize.value, pageStart: pageStart.value,name:formInline.name});
}

const handleCurrentChange = (val) => {
    // console.log(`current page: ${val}`)
    pageStart.value = val;
    getData({ pageSize: pageSize.value, pageStart: pageStart.value,name:formInline.name });
}

const removeData = (row) => {
    console.log(row.id)
    removeStudent({ id: row.id })
        .then(res => {
            console.log(res)
            if (res.data.code === 200 && res.data.data === true) {
                ElMessage({ message: '删除成功', type: 'success' });
                getData();
            }
        })
}
const findStudent = () => {
    getData(formInline);
}
const resetCondition = () => {
    formInline.name = '';
    getData(formInline);
}
const sexText = (row, cloumn) => {
    return row.sex === 1 ? '男' : '女';
}
const stateText = (row, cloumn) => {
    return row.state === 1 ? '已入学' :
    row.state === 2 ? '未入学' : '休学中';
}
</script>


<style lang="scss" scoped>
.studentList {
    .el-pagination {
        text-align: center;
        margin-top: 20px;
    }
    .el-form-item ,.demo-form-inline{
        text-align: left;
    }
}
</style>