<template>
    <div class="pageing">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageStart"
            :page-sizes="[5, 10, 20, 30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
</template>

<script>
import {getTableData2} from '@/api/table.js'
export default {
    props: {
        'total': Number,
        'url': String,
        'loading': Boolean,
        'tableData': Array
    },
    data() {
        return {
            pageStart: 1,
            pageSize: 10
        }
    },
    created() {
        getTableData2(this.$parent, this.url)
    },
    methods: {
        handleSizeChange(val) {
            this.pageSize = val;
            this.pageStart = 1;
            getTableData2(this.$parent, this.url, { pageSize: 1, pageStart: val });
        },
        handleCurrentChange(val) {
            this.pageStart = val;
            getTableData2(this.$parent, this.url, { pageSize: this.pageSize, pageStart: val });
        }

    }
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