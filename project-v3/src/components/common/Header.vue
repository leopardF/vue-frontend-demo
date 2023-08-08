<template>
    <div class="header">
        <el-header>
            <div class="title">通用后台管理系统</div>
            <div>
                <i class="fa fa-user"></i>{{ name }}
                
            </div>
        </el-header>
    </div>

</template>

<script>
import {getToken} from '@/utils/setToken.js'
export default{
    data(){
        return{
            name:''
        }
    },
    created() {
        this.name = getToken('username')
    }
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