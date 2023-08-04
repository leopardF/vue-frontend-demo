<template>
    <div class="permission-view">
        <el-tree :data="filteredMenus" show-checkbox node-key="id" :props="defaultProps" ref="tree">
        </el-tree>
        <el-button @click="getCheckedNodes">通过node获取</el-button>
    </div>
</template>
<script setup>
import { getCurrentInstance, defineEmits,defineExpose } from 'vue'
const { proxy } = getCurrentInstance();
const emit = defineEmits()
const defaultProps = {
    label: 'name',
    children: 'children'
};

const menus = [...proxy.$router.options.routes];
// console.log(menus , 'menus');
const filterHiddenRoutes = (routes) => {
    return routes.filter(route => !route.hidden);
}
const filteredMenus = filterHiddenRoutes(menus);

const getCheckedNodes = () => {
    let checkedList = proxy.$refs.tree.getCheckedNodes();
    // console.log(checkedList);
    let idList = [];
    checkedList.forEach((node) => {
        idList.push(node.path)
    });
    // console.log("perPage ",idList);

    //子组件触发事件将数据返回给父级组件
    emit("handleGetCheckedNodesMethod", idList);
}
// 暴露给父组件的方法
defineExpose({
  exposeMethod: getCheckedNodes
});

</script>
<style lang="scss" scoped>
.permission-view {
    width: 100%;
}
</style>