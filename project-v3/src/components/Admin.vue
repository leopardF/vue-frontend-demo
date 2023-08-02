<!-- <template>
    <div class="permission">
        <h3>Admin Page</h3>
    </div>
</template>
<script>
import { defineComponent , getCurrentInstance} from 'vue'
export default defineComponent({
    setup() {
        const { proxy } = getCurrentInstance()
        proxy.$https.get('/admin')
        .then(console.log)
        .catch(console.log)
    }
})
</script> -->

<template>
    <div class="permission">
        <h3>Admin Page</h3>
        <el-button type="primary"  @click="blackPage">返回上一页</el-button>
    </div>
</template>
<script>
import { defineComponent , getCurrentInstance} from 'vue'
export default defineComponent({
    setup() {
        const { proxy } = getCurrentInstance();
        function blackPage(){
            proxy.$router.go(-1);
        }
        return {
            blackPage
        }
    }
})
</script>