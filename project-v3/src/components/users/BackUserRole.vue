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
import { computed, ref,defineProps,watch,toRefs } from "vue";
import {ElMessage} from "element-plus";
import { updateBackUserRole } from '@/api/users/backUserRole.js';

const props = defineProps(["userId","roles","checkedList"]);
const {userId,roles,checkedList} = toRefs(props);

const checkedRoles = ref([]);
const checkAll = checkedList.value.length === 0 ? ref(null) : checkedList.value.length === roles.value.length ? ref(true) : ref(false);
const isIndeterminate = checkedList.value.length > 0 ? ref(true) : ref(false);
const roleIds = computed(() => roles.value?.map(role => role.id));

watch(checkedList, (newValue, oldValue) => {
    checkedRoles.value = [...newValue];
    // console.log("new checkedList", newValue);
}, { immediate: true, deep: true });

const handleCheckAllChange = (val) => {
    checkedRoles.value = val ? roleIds.value : [];
    isIndeterminate.value = false;
}
const handleCheckedRoleChange = (value) => {
    const checkedCount = value.length;
    checkAll.value = checkedCount === roleIds.length;
    isIndeterminate.value = checkedCount > 0 && checkedCount < roleIds.length;
}


const updateCheckedNodes = () => {
    let idList = checkedRoles.value;
    console.log("perPage idList",idList);
    updateBackUserRole({"backgroundUserId":userId.value , "roleIdList": idList})
        .then(res => {
            if (res.data.code === 200) {
                ElMessage({ message: '更新成功', type: 'success' })
            } else {
                ElMessage({ message: '更新失败', type: 'error' })
            }
        })
        .catch(err => {
            throw err
        })
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