<template>
    <div class="menu">
        <el-aside width="200px">
            <el-menu router :default-active="activePath" class="el-menu-vertical-demo" background-color="#42a1ed" text-color="#fff"
                active-text-color="#ffd04b">
                <template v-for="(item, index) in menus">
                    <el-sub-menu :index="index + ''" :key="index" v-if="!item.hidden">
                        <template #title>
                            <i :class="item.iconClass"></i>
                            <span>{{ item.name }}</span>
                        </template>
                        <el-menu-item :index="child.path" v-for="(child, index) in filteredChildren(item.children)" :key="index">
                            <i :class="child.iconClass"></i>
                            {{child.name}}
                        </el-menu-item>
                    </el-sub-menu>
                </template>

            </el-menu>
        </el-aside>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const menus = router.options.routes
// console.log("router.currentRoute.value.path",router.currentRoute.value.path)
const activePath = [router.currentRoute.value.path]

const filteredChildren = (children) => {
  return children.filter(child => !child.hidden);
};
</script>
<style lang="scss" scoped>
.menu {
    .el-aside {
        height: 100%;

        .el-menu {
            height: 100%;
            .fa{
                margin-right: 10px;
            }
            .el-menu-item {
                background-color: #669ed5;
            }
        }

        .el-sub-menu{
            margin-bottom: 6px;
            box-shadow: 0 2px 3px #fff;
        }

    }
}
</style>