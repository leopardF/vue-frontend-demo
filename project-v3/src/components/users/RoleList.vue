<template>
    <div class="roleList">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
            <el-form-item>
                <el-button type="primary" @click="addRole">新增</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" border style="width: 300px">
            <el-table-column prop="roleName" label="角色名" align="center" width="150">
            </el-table-column>
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
        <el-dialog :title="state ? '添加角色信息' : '修改角色信息'" v-model="dialogFormVisible" width="500px">
            <el-form :model="form" :rules="rules" ref="formRef">
                <el-form-item label="角色名" :label-width="formLabelWidth" prop="roleName">
                    <el-input v-model="form.roleName" autocomplete="off" id="roleName"></el-input>
                </el-form-item>
            </el-form>
            <RolePermission :roleId="currentRoleId" :memuList="memuList" :checkedList="menuCheckList" v-if="!state"/>
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
} from '@element-plus/icons-vue';
import { getTableData, addInfo,updateInfo,delData,getDataByUrl } from '@/api/table.js';
import {ElMessage} from "element-plus";
import { onMounted, reactive, ref, nextTick } from 'vue';
import RolePermission from './RolePermission.vue';

const tableData = ref([]);
const pageStart = ref(1);
const pageSize = ref(10);
const total = ref(0);
const formInline = reactive({
    roleName: ''
});
const dialogFormVisible = ref(false);
const initForm = {
    roleName: '',
};
const form = reactive({...initForm});
const formLabelWidth = '80px';
const rules = {
    roleName: [{ required: true, message: '请输入角色名' }],
};
const state = ref(true);
const getTableDataUrl = '/v1/role/getRoleList';
const loading = ref(true);
const memuList = ref([]);

onMounted(()=>{
    getTableData(tableData, total, getTableDataUrl);
    loading.value = false;
    getDataByUrl(`/v1/menus/getMenusListByTree`)
    .then(res => {
        if (res.data.code === 200) {
            memuList.value = res.data.data;
        } else {
            ElMessage({ message: '查询失败', type: 'error' })
        }
    })
    .catch(err => {
        throw err
    })
})
const handleSizeChange = (val) => {
    // console.log(`每页 ${val} 条`);
    pageSize.value = val;
    pageStart.value = 1;
    getTableData(tableData, total, getTableDataUrl, { pageSize: pageSize.value, pageStart: pageStart.value, name: formInline.name });
    loading.value = false;
}
const handleCurrentChange = (val) => {
    // console.log(`当前页: ${val}`);
    pageStart.value = val;
    getTableData(tableData, total, getTableDataUrl, { pageSize: pageSize.value, pageStart: pageStart.value, name: formInline.name });
    loading.value = false;
}

const formRef = ref({});
const closeInfo = (formRef) => {
    dialogFormVisible.value = false;
    formRef.value?.resetFields();
};
const removeData = (row) => {
    delData(tableData,total, "/v1/role/removeRoleInfo", row.id, getTableData, getTableDataUrl);
    loading.value = false;
}
const currentRoleId = ref('');
const menuCheckList = ref([]);
const editData = (row) => {
    state.value = false;
    currentRoleId.value = row.id;
    // Object.assign(form, row); //写法类似拷贝行数据的副本，不然直接获取row的话，会是当前行的实时数据

    getDataByUrl(`/v1/roleMenus/getRoleMenusList/` + row.id)
    .then(res => {
        if (res.data.code === 200) {
            menuCheckList.value = [];
            res.data.data.forEach(menuInfo => {
                menuCheckList.value.push(menuInfo.menuId);
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

}
const addRole = () => {
    state.value = true;
    dialogFormVisible.value = true;
    Object.assign(form, initForm);
}

const onSumbit = (formRef) => {
    // console.log(formRef, 'formRef2');
    formRef.validate(vaild => {
        if (vaild) {
            if (state.value) {
                addInfo(tableData, total,dialogFormVisible, pageStart, "/v1/role/addRoleInfo", form, getTableData, getTableDataUrl);
            } else {
                updateInfo(tableData, total,dialogFormVisible, "/v1/role/updateRoleInfo", form, getTableData, getTableDataUrl)
            }
        } else {
            // 验证不通过，显示错误信息
            ElMessage({ message: '表单数据验证失败', type: 'error' });
        }
    })
}

</script>

<style scoped lang="scss">
.roleList {
    .el-pagination {
        text-align: center;
        margin-top: 20px;
    }
    .el-form-item ,.demo-form-inline{
        text-align: left;
    }
}
</style>