<template>
    <div class="header">
        <el-header>
            <div class="title">通用后台管理系统</div>
            <div>
                <i class="fa fa-user-circle-o"></i>
                <span v-popover="popoverRef" v-click-outside="onClickOutside">{{ name }}</span>
                <el-popover
                    ref="popoverRef"
                    trigger="click"
                    title="设置"
                    virtual-triggering
                    persistent>
                    <a class="fa fa-unlock-alt" @click="showDialog"> 修改密码 </a>
                </el-popover>
                <a class="fa fa-sign-out" style="margin:0 10px" @click="logout"></a>
            </div>
        </el-header>
        <el-dialog :title="'修改密码'" v-model="dialogFormVisible" width="500px">
            <el-form :model="form" :rules="rules" ref="formRef">
                <el-form-item label="原始密码" :label-width="formLabelWidth" prop="oldPassword">
                    <el-input type="password" v-model="form.oldPassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" :label-width="formLabelWidth" prop="newPassword">
                    <el-input type="password" v-model="form.newPassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" :label-width="formLabelWidth" prop="confimPassword">
                    <el-input type="password" v-model="form.confimPassword" autocomplete="off"></el-input>
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
import {getToken, removeToken} from '@/utils/setToken.js'
import { useRouter } from 'vue-router'
import { ref,reactive,unref } from 'vue';
import { validateConfirmPassword,passRule} from '@/utils/vaildate.js'
import { updateBackUserByPassword } from '@/api/users/backUserRole.js';
import {ElMessage,ClickOutside as vClickOutside} from "element-plus";
const router = useRouter();
const name = getToken('username');
const dialogFormVisible = ref(false);
const formLabelWidth = '100px';
const intiForm = {
    oldPassword: '',
    newPassword: '',
    confimPassword: ''
};
const form = reactive({...intiForm});
const rules = {
    oldPassword: [{ required: true, message: '请输入原始密码' }],
    newPassword: [
        { required: true, message: '请输入新密码' },
        { validator: passRule, trigger: 'blur' }
    ],
    confimPassword: [
        { required: true, message: '请输入确认密码' },
        { validator: (rule, value, callback) => validateConfirmPassword(rule, value, form.newPassword, callback), trigger: 'blur' }
    ]
}

const logout = () => {
    //正常要清除后端token数据，此处简易跳过
    removeToken("token")
    removeToken("username")
    router.replace({path:"/"});
    window.location.reload();
}

const showDialog = () => {
    dialogFormVisible.value = !dialogFormVisible.value;
}

const popoverRef = ref()
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.()
}


const formRef = ref({});
const onSumbit = (formRef) => {
    // console.log(form, this.form);
    formRef.validate(vaild => {
        if (vaild) {
            updateBackUserByPassword(form).then(res => {
                if (res.data.code === 200) {
                    ElMessage({ message: '编辑成功', type: 'success' })
                    dialogFormVisible.value = false;
                } else {
                    ElMessage({ message: res.data.message, type: 'error' })
                }
            })
            Object.assign(form, intiForm);
        } else {
            // 验证不通过，显示错误信息
            ElMessage({ message: '表单数据验证失败', type: 'error' });
        }
    })
}
</script>
<style lang="scss" scoped>
.header{
    .el-header{
        background: #358de4;
        color: #fff;
        line-height: 60px;
        display: flex;
        justify-content: space-between;
        .title{
            width: 200px;
            font-size: 24px;
        }
        i{
            margin-right: 10px;
        }
    }
}
</style>