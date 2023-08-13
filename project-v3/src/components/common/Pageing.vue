<template>
    <div class="pageing">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageStartTemp"
            :page-sizes="[5, 10, 20, 30]" :page-size="pageSizeTemp" layout="total, sizes, prev, pager, next, jumper"
            :total="totalTemp">
        </el-pagination>
    </div>
</template>

<script setup>
import { defineProps,toRefs, defineEmits,ref,watch,reactive } from 'vue'
const props = defineProps(["pageStart","pageSize","total","formInline"]);
const {pageStart,pageSize,total,formInline} = toRefs(props);

const pageStartTemp = ref(10);
const pageSizeTemp = ref(1);
const totalTemp = ref(0);
const formInlineTemp = reactive({});

watch(pageStart, (newValue, oldValue) => {
    pageStartTemp.value = newValue;
}, { immediate: true, deep: true });

watch(pageSize, (newValue, oldValue) => {
    pageSizeTemp.value = newValue;
}, { immediate: true, deep: true });

watch(total, (newValue, oldValue) => {
    totalTemp.value = newValue;
}, { immediate: true, deep: true });

watch(formInline, (newValue, oldValue) => {
    Object.assign(formInlineTemp, newValue);
}, { immediate: true, deep: true });

const emit = defineEmits()
const handleSizeChange = (val) => {
    console.log(`每页 ${val} 条`);
    pageSizeTemp.value = val;
    pageStartTemp.value = 1;
    //子组件触发事件将数据返回给父级组件
    let params =  { pageSize: pageSizeTemp.value, pageStart: pageStartTemp.value, searchName: formInlineTemp.searchName };
    console.log(`params---` ,params);
    emit("getData", params);
}
const handleCurrentChange = (val) => {
    console.log(`当前页: ${val}`);
    pageStartTemp.value = val;
    let params =  { pageSize: pageSizeTemp.value, pageStart: pageStartTemp.value, searchName: formInlineTemp.searchName };
    console.log(`params---` ,params);
    emit("getData", params);
}
</script>

<style scoped lang="scss">
.pageing {
    .el-pagination {
        text-align: center;
        margin-top: 20px;
    }
}
</style>