<template>
    <div class="pageing">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageStart"
            :page-sizes="[5, 10, 20, 30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="total" :url="url">
        </el-pagination>
    </div>
</template>

<script>
import { getTableData } from '@/api/table'
export default {
    props: {
        'total': Number,
        'url': String
    },
    data() {
        return {
            pageStart: 1,
            pageSize: 10
        }
    },
    created() {
        getTableData(this.$parent, this.url)
    },
    methods: {
        handleSizeChange(val) {
            this.pageSize = val;
            this.pageStart = 1;
            getTableData(this.$parent, this.url, { pageSize: 1, pageStart: val });
        },
        handleCurrentChange(val) {
            this.pageStart = val;
            getTableData(this.$parent, this.url, { pageSize: this.pageSize, pageStart: val });
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