<template>
    <div class="role-view">
        <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange">
            全选
        </el-checkbox>
        <el-checkbox-group
            v-model="checkedRoles"
            @change="handleCheckedRoleChange">
            <el-checkbox v-for="(role , index) in roles" :key="index" :label="role.id">
                {{role.roleName}}
            </el-checkbox>
        </el-checkbox-group>
        <el-button @click="updateCheckedNodes">更新角色</el-button>
        {{ checkedList }}
    
    </div>
</template>

<script setup>
import { computed, ref,watch,defineProps } from "vue";
import { updateInfoNotTable } from '@/api/table.js';

const { userId,roles,checkedList } = defineProps(["userId","roles","checkedList"]);

const checkedRoles = ref([]);
const checkAll = checkedList.length === 0 ? ref(null) : ref(false);
const isIndeterminate = checkedList.length > 0 ? ref(true) : ref(false);
const roleIds = computed(() => roles.value.map(role => role.id));
watch(checkedList, newValue => {
  checkedRoles.value = [...newValue]; // 更新 checkedRoles 的值
});

const handleCheckAllChange = (val) => {
    checkedRoles.value = val ? roleIds.value : [];
    isIndeterminate.value = false;
}
const handleCheckedRoleChange = (value) => {
    const checkedCount = value.length;
    checkAll.value = checkedCount === roleIds.value.length;
    isIndeterminate.value = checkedCount > 0 && checkedCount < roleIds.value.length;
}


const updateCheckedNodes = () => {
    let idList = checkedRoles.value;
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