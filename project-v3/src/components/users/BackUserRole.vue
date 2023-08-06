<template>
    <div class="role-view">
        <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
            >全选</el-checkbox
        >
        <el-checkbox-group
            v-model="checkedRoles"
            @change="handleCheckedRoleChange"
        >
            <el-checkbox v-for="role in roles" :key="role.id" :label="role.id">
                {{role.roleName}}
            </el-checkbox>
        </el-checkbox-group>
        <el-button @click="updateCheckedNodes">更新角色</el-button>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
const { userId,roles } = defineProps(["userId","roles"]);
import { getTableData, updateInfoNotTable } from '@/api/table.js';

const checkAll = ref(false);
const isIndeterminate = ref(true);
const checkedRoles = ref([]);

onMounted(() => {
    console.log(roles);
})

const handleCheckAllChange = (val) => {
    checkedRoles.value = val ? roles : []
    isIndeterminate.value = false
}
const handleCheckedRoleChange = (value) => {
    const checkedCount = value.length
    checkAll.value = checkedCount === roles.length
    isIndeterminate.value = checkedCount > 0 && checkedCount < roles.length
}



const updateCheckedNodes = () => {
    let checkedList = [];
    console.log(checkedList);
    let idList = [];
    checkedList.forEach((node) => {
        idList.push(node.path)
    });
    console.log("perPage ",idList);
    updateInfoNotTable("/v1/backUserRole/updateBackUserRole", {"backgroundUserId":userId , "roleIdList": idList});

}

</script>

<style scoped lang="scss">
.role-view{
    width: 100%;
    .el-checkbox-group,.el-checkbox{
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        margin-right: 20px;
    }
}
</style>