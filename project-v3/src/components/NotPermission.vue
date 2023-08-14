<template>
    <div class="permission">
        <h3>暂时没有权限</h3>
        <el-button type="primary"  @click="blackPage">返回上一页</el-button>
    </div>
</template>
<script setup>
import { getCurrentInstance} from 'vue'
const { proxy } = getCurrentInstance()
const blackPage = () => {
    proxy.$router.go(-1);
}
</script>