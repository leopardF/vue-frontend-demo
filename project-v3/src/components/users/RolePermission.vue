<template>
    <div class="permission-view">
        <el-tree :data="filteredMenus" show-checkbox node-key="id" :props="defaultProps" ref="tree">
        </el-tree>
        <el-button @click="updateCheckedNodes">更新权限</el-button>
    </div>
</template>
<script setup>
import { getCurrentInstance, defineProps,toRefs } from 'vue'
import { updateInfoNotTable } from '@/api/table.js';
const { proxy } = getCurrentInstance();
const props = defineProps(["roleId","memuList","checkedList"]);
const {roleId,memuList,checkedList} = toRefs(props);
// const emit = defineEmits()
const defaultProps = {
    label: 'name',
    children: 'children'
};

// const menus = [...proxy.$router.options.routes];
const packageMenus = (data, menuData) => {
    console.log("111",data , menuData); 
    data.forEach(item => {
        if(item.children === undefined){
            item.children = [];
        }
        menuData.push({
            name: item.menuName,
            path: item.menuUrl,
            iconClass: item.iconClazz,
            meta: {
                label: item.menuName,
            },
            hidden: item.hidden === undefined ? false : item.hidden,
            component: ()=> import('@/components' + item.pageUrl), //懒加载
            children: item.childrenList && item.childrenList.length > 0 ? packageMenus(item.childrenList,item.children) : []
        })
    })
}
const menus = [];

packageMenus(memuList.value, menus);

//只对第一级隐藏
const filterHiddenRoutes = (routes) => {
    return routes.filter(route => !route.hidden);
}
//递归隐藏
const filterHiddenSubRoutes = (routes) => {
  return routes.map(route => {
    if (route.children && route.children.length > 0) {
      route.children = filterHiddenSubRoutes(route.children);
    }
    return route.hidden ? null : route;
  }).filter(route => route !== null);
}
const filteredMenus = filterHiddenRoutes(menus);
console.log(menus);

const updateCheckedNodes = () => {
    let checkedList = proxy.$refs.tree.getCheckedNodes();
    console.log(checkedList);
    let idList = [];
    checkedList.forEach((node) => {
        idList.push(node.path)
    });
    console.log("perPage ",idList);
    updateInfoNotTable("/v1/roleMenus/updateRoleMenus", {"roleId":roleId , "menusIdList": idList});

}


</script>
<style lang="scss" scoped>
.permission-view {
    width: 100%;
}
</style>