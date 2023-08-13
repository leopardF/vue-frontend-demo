<template>
    <div class="login">
        <el-card class="box-card">
            <template #header>
                <div class="clearfix">
                    <span>通用后台管理系统</span>
                </div>
            </template>
            <el-form label-width="80px" :model="form" ref="formRef" :rules="rules">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username" id="username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="form.password" id="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="loginFun(formRef)">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup>

import { loginNameRule,passRule} from '../utils/vaildate.js'
import { setToken} from '@/utils/setToken.js'
import {loginSum} from '@/api/login.js'
import {ElMessage} from "element-plus";
import { useRouter,useRoute } from 'vue-router'
const router = useRouter();
const route = useRoute();
const form = {
    username: '',
    password: ''
};
const rules ={
    username:[{validator:loginNameRule,trigger:'blur'}],
    password:[{validator:passRule,trigger:'blur'}]
}

const loginFun = (formRef) =>{
    formRef.validate((valid)=>{
        if(valid){
            
            loginSum(form).then(res => {
                if(res.data.code === 200){
                    // localStorage.setItem('username',res.data.username)
                    setToken("username" ,res.data.data.username )
                    setToken("token" ,res.data.data.token )
                    ElMessage({message: res.data.message, type:'success'})
                    router.push(route.query.redirect || '/home')
                }
            })
            .catch(err => {
                console.log(err);
            })
        } else {
            ElMessage({ message: '表单数据验证失败', type: 'error' });
        }
    })
}
</script>

<style lang="scss">
.login {
    width: 100%;
    height: 100%;
    position:absolute;
    background: url("../assets/zm1.jpg") center no-repeat;
    background-size: 100%;
    .el-card {
        background: #65768557;
    }
    .box-card {
        width: 450px;
        margin: 200px auto;
        color: #FFF;
        .el-form .el-form-item__label{
            color: #FFF;
        }
        .el-card__header {
            font-size: 34px;
        }

        .el-button {
            width: 100%;
        }
    }
}
</style>