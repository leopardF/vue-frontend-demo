<template>
    <div class="infoManager">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
            <el-form-item>
                <el-button type="primary" @click="addStudent">新增</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="name" label="姓名" align="center" width="100">
            </el-table-column>
            <el-table-column prop="age" label="年龄" align="center" width="68">
            </el-table-column>
            <el-table-column prop="sex" label="性别" align="center" width="68" :formatter="sexText">
            </el-table-column>
            <el-table-column prop="fatherName" label="父亲姓名" align="center" width="120">
            </el-table-column>
            <el-table-column prop="motherName" label="母亲姓名" align="center" width="120">
            </el-table-column>
            <el-table-column prop="enrollTime" label="入校时间" align="center" width="100">
            </el-table-column>
            <el-table-column prop="address" label="家庭住址" align="center" width="300">
            </el-table-column>
            <el-table-column prop="phone" label="联系方式" align="center" width="150">
            </el-table-column>
            <el-table-column label="操作" align="center" >
                <template #default="scope">
                    <el-button type="primary" size="small" :icon="Edit" @click="editData(scope.row)"></el-button>
                    <el-button type="danger" size="small" :icon="Delete" @click="removeData(scope.row)"></el-button>
                </template>
                <!-- <template slot-scope="scope">
                    <el-button type="primary" size="mini" icon="el-icon-edit" @click="editData(scope.row)"></el-button>
                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeData(scope.row)"></el-button>
                </template> -->
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageStart"
            :page-sizes="[5, 10, 20, 30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
        <el-dialog :title="state ? '添加學生信息' : '修改学生信息'" v-model="dialogFormVisible" width="500px">
            <el-form :model="form" :rules="rules" ref="formRef">
                <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="form.name" autocomplete="off" id="name"></el-input>
                </el-form-item>
                <el-form-item label="年齡" :label-width="formLabelWidth" prop="age">
                    <el-input v-model="form.age" autocomplete="off" id="age"></el-input>
                </el-form-item>
                <el-form-item label="性別" :label-width="formLabelWidth" prop="sex">
                    <el-radio v-model="form.sex" :label="1">男</el-radio>
                    <el-radio v-model="form.sex" :label="2">女</el-radio>
                </el-form-item>
                <el-form-item label="学号" :label-width="formLabelWidth" prop="number">
                    <el-input v-model="form.number" autocomplete="off" id="number"></el-input>
                </el-form-item>
                <el-form-item label="班级" :label-width="formLabelWidth" prop="clazz">
                    <el-input v-model="form.clazz" autocomplete="off" id="clazz"></el-input>
                </el-form-item>
                <el-form-item label="家庭住址" :label-width="formLabelWidth" prop="address">
                    <el-input v-model="form.address" autocomplete="off" id="address"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" :label-width="formLabelWidth" prop="phone">
                    <el-input v-model="form.phone" autocomplete="off" id="phone"></el-input>
                </el-form-item>
                <el-form-item label="父亲姓名" :label-width="formLabelWidth" prop="fatherName">
                    <el-input v-model="form.fatherName" autocomplete="off" id="fatherName"></el-input>
                </el-form-item>
                <el-form-item label="母亲姓名" :label-width="formLabelWidth" prop="motherName">
                    <el-input v-model="form.motherName" autocomplete="off" id="motherName"></el-input>
                </el-form-item>
                <el-form-item label="入校时间" :label-width="formLabelWidth" prop="enrollTime">
                    <el-date-picker v-model="form.enrollTime" format="YYYY 年 MM 月 DD 日" value-format="YYYY-MM-DD"
                        type="date" placeholder="选择日期" id="enrollTime">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <template #footer>
                <span  class="dialog-footer">
                    <el-button @click="closeInfo(formRef)">取 消</el-button>
                    <el-button type="primary" @click="onSumbit(formRef)">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
import {  Check, Delete, Edit, Message, Search, Star } from '@element-plus/icons-vue';
import { getStudentList, removeStudent, addStudentInfo, updateStudent } from '@/api/students/infoList.js'
import {ElMessage, ElMessageBox} from "element-plus";
import { onMounted, reactive, ref, nextTick} from 'vue';
const tableData = ref([]);
const pageStart = ref(1);
const pageSize = ref(10);
const total = ref(0);
const formInline = reactive({
    name: ''
});
const dialogFormVisible = ref(false);
const intiForm = {
    name: '',
    age: '',
    sex: '1',
    number: '',
    clazz: '',
    address: '',
    phone: '',
    fatherName: '',
    motherName: '',
    enrollTime: ''
};
const form = reactive({...intiForm});
const formLabelWidth = '80px';
const rules = {
    name: [{ required: true, message: '请输入姓名' }],
    age: [{ required: true, message: '请输入年龄' }],
    sex: [{ required: true, message: '请输入性别' }],
    number: [{ required: true, message: '请输入学号' }],
    clazz: [{ required: true, message: '请输入班级' }],
    address: [{ required: true, message: '请输入地址' }],
    enrollTime: [{ required: true, message: '请输入入学时间' }],
    phone: [{ required: true, message: '请输入联系方式' }]
};
const state = ref(true);

const getData = (params) => {
    getStudentList(params)
        .then(res => {
            // console.log(res)
            if (res.data.code === 200) {
                tableData.value = res.data.data.dataList
                total.value = res.data.data.total
            }else{
                ElMessage({ message: '查询失败', type: 'error' })
            }
        })
}
onMounted(()=> {
    getData()
})
const handleSizeChange = (val) => {
    // console.log(`每页 ${val} 条`);
    pageSize.value = val;
    pageStart.value = 1;
    getData({ pageSize: pageSize.value, pageStart: pageStart.value, name: formInline.name });
}
const handleCurrentChange = (val) => {
    // console.log(`当前页: ${val}`);
    pageStart.value = val;
    getData({ pageSize: pageSize.value, pageStart: pageStart.value, name: formInline.name });
}

const formRef = ref({});
const closeInfo = (formRef) => {
    dialogFormVisible.value = false;
    nextTick(() => {
        formRef.value?.resetFields();
    });
}
const removeData = (row) => {
    ElMessageBox.confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '关闭',
        type: 'warning',
    })
    .then(() => {
        removeStudent({ id: row.id })
        .then(res => {
            if (res.data.code === 200 && res.data.data === true) {
                ElMessage({ message: '删除成功', type: 'success' })
            }else{
                ElMessage({ message: '删除失败', type: 'error' })
            }
        })
    })
    .catch(() => {
        ElMessage({ message: '已取消', type: 'success' })
    })
}
const editData = (row) => {
    state.value = false;
    console.log(row);
    dialogFormVisible.value = true;
    // form = { ...row };
    Object.assign(form, row);
}
const addStudent = () => {
    state.value = true;
    dialogFormVisible.value = true;
    formRef.value?.resetFields();
    Object.assign(form, intiForm);
}
const onSumbit = (formRef) => {
    // console.log(form, this.form);
    formRef.validate(vaild => {
        if (vaild) {
            const methodChange = state.value ? addStudentInfo(form) : updateStudent(form);
            methodChange.then(res => {
                if (res.data.code === 200) {
                    ElMessage({ message: state.value ? '新增成功' : '编辑成功', type: 'success' })
                } else {
                    ElMessage({ message: state.value ? '新增失败' : '编辑失败', type: 'error' })
                }
            })
            dialogFormVisible.value = false;
            pageStart.value = 1;
            getData();
        } else {
            // 验证不通过，显示错误信息
            ElMessage({ message: '表单数据验证失败', type: 'error' });
        }
    })
}
const sexText = (row, cloumn) => {
    return row.sex === 1 ? '男' : '女';
}
</script>

<style lang="scss" scoped>
.infoManager {
    .el-pagination {
        text-align: center;
        margin-top: 20px;
    }

    .el-form-item,
    .demo-form-inline {
        text-align: left;
    }
}
</style>