<template>
    <div class="login">
        <el-card class="box-card">
            <template #header>
                <div class="clearfix">
                    <span>通用后台管理系统</span>
                </div>
            </template>
            <el-form label-width="80px" :model="form" ref="form" :rules="rules">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username" id="username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="form.password" id="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="login('form')">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import { nameRule,passRule} from '../utils/vaildate.js'
import { setToken} from '@/utils/setToken.js'
import {login} from '@/api/api.js'
export default {
    data() {

        return {
            form: {
                username: '',
                password: ''
            },
            rules:{
                username:[{validator:nameRule,trigger:'blur'}],
                password:[{validator:passRule,trigger:'blur'}]
            }
        }
    },
    methods:{
        login(form){
            this.$refs[form].validate((valid)=>{
                if(valid){
                    console.log(this.form);
                    
                    login(this.form).then(res => {
                        if(res.data.code === 200){
                            // localStorage.setItem('username',res.data.username)
                            setToken("username" ,res.data.data.username )
                            setToken("token" ,res.data.data.token )
                            this.$message({message: res.data.message, type:'success'})
                            this.$router.push(this.$route.query.redirect || '/home')
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
                } else {
                    console.error(this.form);
                }
            })
        }
    }
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