<template>
    <div class="login">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>通用后台管理系统</span>
            </div>
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
export default {
    data() {
        const validateName = (rule, value, callback) => {
            //请输入4-10位昵称
            let reg = /(^[a-zA-Z0-9]{4,10}$)/
            if(value === ""){
                callback(new Error('请输入用户名'))
            }else if(!reg.test(value)){
                callback(new Error('请输入4-10位昵称用户名'))
            }else{
                callback()
            }
        }
        const validatePwd = (rule, value, callback) => {
            let pass = /^\S*(?=\S[6,12})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/;
            if(value === ""){
                callback(new Error('请输入密码'))
            }else if(!pass.test(value)){
                callback(new Error('请输入6-12位密码需要包含大小写字符和数字及特殊符号'))
            }else{
                callback()
            }
        }
        return {
            form: {
                username: '',
                password: ''
            },
            rules:{
                username:[{validator:validateName,trigger:'blur'}],
                password:[{validator:validatePwd,trigger:'blur'}]
            }
        }
    },
    methods:{
        login(form){
            this.$refs[form].validate((valid)=>{
                if(valid){
                    console.log(this.form);
                    this.axios.post('http://localhost:8080/api/v1/login', this.form)
                    .then(res => {
                        console.log(res);
                        console.log(res.data);
                        if(res.data.code === 200){
                            localStorage.setItem('username',res.data.username)
                            this.$message({message: res.data.message, type:'success'})
                            this.$router.push('/home')
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
    position:resolute;
    background: #409EFF;

    .box-card {
        width: 450px;
        margin: 200px auto;

        .el-card__header {
            font-size: 34px;
        }

        .el-button {
            width: 100%;
        }
    }
}
</style>