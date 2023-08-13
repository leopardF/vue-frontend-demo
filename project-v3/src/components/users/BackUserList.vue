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
import { getBackUserList, getRoleList,removeBackUser,getUserRoleList,addBackUserInfo,updateBackUserInfo } from '@/api/users/backUserRole.js';
import { onMounted, reactive, ref} from 'vue'
import {ElMessage,ElMessageBox} from "element-plus";
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
const loading = ref(true);

const getData = (params) => {
    loading.value = true;
    getBackUserList(params)
        .then(res => {
            // console.log(res)
            if (res.data.code === 200) {
                tableData.value = res.data.data.dataList
                total.value = res.data.data.total
            }else{
                ElMessage({ message: '查询失败', type: 'error' })
            }
        })
        .catch(err => {
            throw err
        })
    loading.value = false;
}
const roles = ref([]);
const getRoleData = () => {
    getRoleList({"pageSize": 1000})
        .then(res => {
            if (res.data.code === 200) {
                roles.value = res.data.data.dataList;
            } else {
                ElMessage({ message: '查询失败', type: 'error' })
            }
        })
        .catch(err => {
            throw err
        })
}

onMounted(()=>{
    getData();
    getRoleData();
});

const handleSizeChange = (val) => {
    // console.log(`每页 ${val} 条`);
    pageSize.value = val;
    pageStart.value = 1;
    getData({ pageSize: pageSize.value, pageStart: pageStart.value, name: formInline.name });
};
const handleCurrentChange = (val) => {
    // console.log(`当前页: ${val}`);
    pageStart.value = val;
    getData({ pageSize: pageSize.value, pageStart: pageStart.value, name: formInline.name });
};
const formRef = ref({});
const closeInfo = () => {
    dialogFormVisible.value = false;
    formRef.value?.resetFields();
};
const removeData = (row) => {
    ElMessageBox.confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '关闭',
        type: 'warning',
    })
    .then(() => {
        removeBackUser({ id: row.id })
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
    loading.value = false;
};
const currentUserId = ref('');
const roleIdCheckList = ref([]);
const editData = (row) => {
    state.value = false;
    currentUserId.value = row.id;
    getUserRoleList(row.id)
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
            const methodChange = state.value ? addBackUserInfo(form) : updateBackUserInfo(form);
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