<template>
    <div class="permission-view">
        <el-tree :data="filteredMenus" show-checkbox node-key="id" :props="defaultProps" ref="treeRef" :default-checked-keys="checkedMenus" :default-expanded-keys="checkedMenus">
        </el-tree>
        <el-button @click="updateCheckedNodes">更新权限</el-button>
    </div>
</template>
<script setup>
import { getCurrentInstance, defineProps,toRefs, ref ,watch,onMounted, nextTick  } from 'vue'
import { updateInfoNotTable } from '@/api/table.js';
const { proxy } = getCurrentInstance();
const props = defineProps(["roleId","memuList","checkedList"]);
const {roleId,memuList,checkedList} = toRefs(props);
// const emit = defineEmits()
const defaultProps = {
    label: 'name',
    children: 'children'
};


const checkedMenus = ref([]);
watch(checkedList, (newValue, oldValue) => {
    proxy.$refs?.treeRef?.setCheckedKeys([]);
    // console.log("refs.treeRef", proxy.$refs.treeRef)    //跳转进入watch 拿不到  undefined，
    checkedMenus.value = [...newValue];
}, { immediate: true, deep: true });


// const menus = [...proxy.$router.options.routes];
const packageMenus = (data, menuData) => {
    data.forEach(item => {
        const childrenTemp = [];
        if(item.childrenList && item.childrenList.length > 0){
            packageMenus(item.childrenList,childrenTemp)
        }
        menuData.push({
            id: item.id,
            name: item.menuName,
            path: item.menuUrl,
            iconClass: item.iconClazz,
            meta: {
                label: item.menuName,
            },
            hidden: item.isHidden === undefined ? false : item.isHidden,
            component: ()=> import('@/components' + item.pageUrl), //懒加载
            children: childrenTemp
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
// console.log("filteredMenus", filteredMenus)

const updateCheckedNodes = () => {
    let checkedList =  proxy.$refs.treeRef.getCheckedNodes();
    console.log(checkedList);
    let idList = [];
    checkedList.forEach((node) => {
        idList.push(node.id)
    });
    updateInfoNotTable("/v1/roleMenus/updateRoleMenus", {"roleId":roleId.value , "menusIdList": idList});

}


</script>
<style lang="scss" scoped>
.permission-view {
    width: 100%;
}
</style>