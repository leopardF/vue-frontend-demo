<template>
    <div class="userList">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
            <el-form-item>
                <el-button type="primary" @click="addUser">新增</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" border style="width: 900px">
            <el-table-column prop="loginName" label="登录名" align="center" width="150"></el-table-column>
            <el-table-column prop="userName" label="用户" align="center" width="150"></el-table-column>
            <el-table-column prop="telephone" label="手机号" align="center" width="150"></el-table-column>
            <el-table-column prop="loginCount" label="登录次数" align="center" width="150"></el-table-column>
            <el-table-column prop="lastLoginTime" label="最后登录时间" align="center" width="150"></el-table-column>
            <el-table-column label="操作" align="center" width="150">
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

        <el-dialog :title="state ? '添加后台用户信息' : '修改后台用户信息'" v-model="dialogFormVisible" width="500px">
            <el-form :model="form" :rules="rules" ref="formRef">
                <el-form-item label="登录名" :label-width="formLabelWidth" prop="loginName">
                    <el-input v-model="form.loginName" autocomplete="off" id="loginName"></el-input>
                </el-form-item>
                <el-form-item label="用户" :label-width="formLabelWidth" prop="userName">
                    <el-input v-model="form.userName" autocomplete="off" id="userName"></el-input>
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth" prop="telephone">
                    <el-input v-model="form.telephone" autocomplete="off" id="telephone"></el-input>
                </el-form-item>
            </el-form>
            <BackUserRole :userId="currentUserId" :roles="roles" :checkedList="roleIdCheckList" v-if="!state"/>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="closeInfo">取 消</el-button>
                    <el-button type="primary" @click="onSumbit(formRef)">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'
import { getTableData, addInfo,updateInfo,delData,getDataByUrl } from '@/api/table.js'
import {ElMessage} from "element-plus";
import { onMounted, reactive, ref} from 'vue'
import { loginNameRule,userNameRule,telephoneRule } from '@/utils/vaildate.js'
import BackUserRole from './BackUserRole.vue';
const tableData = ref([]);
const pageStart = ref(1);
const pageSize = ref(10);
const total = ref(0);
const formInline = reactive({
    searchName: ''
});
const dialogFormVisible = ref(false);
const initForm = {
    loginName: '',
    userName: '',
    telephone: '',
};
const form = reactive({...initForm});
const formLabelWidth = '80px';
const rules = {
    // userName: [{ required: true, message: '请输入角色名' }],
    loginName: [{ required: true, validator:loginNameRule,trigger:'blur'}],
    userName: [{ required: true, validator:userNameRule,trigger:'blur'}],
    telephone: [{ required: true, validator:telephoneRule,trigger:'blur'}]
};
const state = ref(true);
const getTableDataUrl = '/v1/user/getBackgroundUserList';
const loading = ref(true);
const roles = ref([]);
onMounted(()=>{
    getTableData(tableData, total, getTableDataUrl);
    loading.value = false;
    getTableData(roles, ref(0), "/v1/role/getRoleList", {"pageSize": 1000});
});

const handleSizeChange = (val) => {
    // console.log(`每页 ${val} 条`);
    pageSize.value = val;
    pageStart.value = 1;
    getTableData(tableData, total, getTableDataUrl, { pageSize: pageSize.value, pageStart: pageStart.value, name: formInline.name });
    loading.value = false;
};
const handleCurrentChange = (val) => {
    // console.log(`当前页: ${val}`);
    pageStart.value = val;
    getTableData(tableData, total, getTableDataUrl, { pageSize: pageSize.value, pageStart: pageStart.value, name: formInline.name });
    loading.value = false;
};
const formRef = ref({});
const closeInfo = () => {
    dialogFormVisible.value = false;
    formRef.value?.resetFields();
};
const removeData = (row) => {
    delData(tableData,total, "/v1/user/removeBackgroundUserInfo", row.id, getTableData, getTableDataUrl)
};
const currentUserId = ref('');
const roleIdCheckList = ref([]);
const editData = (row) => {
    state.value = false;
    currentUserId.value = row.id;

    getDataByUrl(`/v1/backUserRole/getBackUserRoleList/` + row.id)
    .then(res => {
        if (res.data.code === 200) {
            roleIdCheckList.value = [];
            res.data.data.forEach(roleInfo => {
                roleIdCheckList.value.push(roleInfo.roleId);
            });
            Object.assign(form, row);
            dialogFormVisible.value = true;
        } else {
            ElMessage({ message: '查询失败', type: 'error' })
        }
    })
    .catch(err => {
        throw err
    })
};

const addUser = () => {
    state.value = true;
    dialogFormVisible.value = true;
    Object.assign(form, initForm);
};
const onSumbit = (formRef) => {
    formRef.validate(vaild => {
        if (vaild) {
            if (state.value) {
                addInfo(tableData, total,dialogFormVisible, pageStart, "/v1/user/addBackgroundUserInfo", form, getTableData, getTableDataUrl)
            } else {
                updateInfo(tableData, total,dialogFormVisible, "/v1/user/editBackgroundUserInfo", form, getTableData, getTableDataUrl)
            }
        } else {
            // 验证不通过，显示错误信息
            ElMessage({ message: '表单数据验证失败', type: 'error' });
        }
    })
}
</script>


<style scoped lang="scss">
.userList {
    .el-pagination {
        text-align: center;
        margin-top: 20px;
    }
    .el-form-item ,.demo-form-inline{
        text-align: left;
    }
}
</style>