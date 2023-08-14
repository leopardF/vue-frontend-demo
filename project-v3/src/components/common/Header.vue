<template>
    <div class="header">
        <el-header>
            <div class="title">通用后台管理系统</div>
            <div>
                <i class="fa fa-user"></i>{{ name }}
                <a class="fa fa-sign-out" style="margin-right:0 5px" @click="logout"></a>
            </div>
        </el-header>
    </div>

</template>

<script setup>
import {getToken, removeToken} from '@/utils/setToken.js'
import { useRouter } from 'vue-router'
import store from '@/store'
const router = useRouter();
const name = getToken('username');
const logout = () => {
    //正常要清除后端token数据，此处简易跳过
    removeToken("token")
    removeToken("username")
        router.replace({path:"/"});
        window.location.reload();
    // store.dispatch("permit/actionRemovePermission")
    // .then(() => {
    //     router.replace({path:"/"});
    // })
    // .catch(err => {
    //     console.log("err" , err)
    // })
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