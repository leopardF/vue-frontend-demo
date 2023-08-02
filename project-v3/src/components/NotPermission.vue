<template>
    <div class="permission">
        <h3>暂时没有权限</h3>
        <el-button type="primary"  @click="blackPage">返回上一页</el-button>
    </div>
</template>
<script>
import { defineComponent , getCurrentInstance} from 'vue'
export default defineComponent({
    setup() {
        const { proxy } = getCurrentInstance()
        function blackPage(){
            proxy.$router.go(-1);
        }
    },
    return : {
        blackPage
    }
})
</script>