<template>
    <div class="homeworkList">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
            <el-form-item label="作业">
                <el-input v-model="formInline.title" placeholder="请输入作业查询"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="findHomeword">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="resetCondition">重置</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" v-loading="loading" border style="width: 100%">
            <el-table-column prop="id" label="ID" align="center">
            </el-table-column>
            <el-table-column prop="userId" label="用户ID-所属班级" align="center">
            </el-table-column>
            <el-table-column prop="title" label="作业名称" align="center">
            </el-table-column>
            <el-table-column prop="completed" label="完成情况" align="center" :formatter="completedText">
            </el-table-column>
            <!-- <el-table-column label="操作" align="center" >
                <template slot-scope="scope">
                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeData(scope.row)"></el-button>
                </template>
            </el-table-column> -->
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageStart"
            :page-sizes="[5, 10, 20, 30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
</template>
<script>
import {getTableData } from '@/api/table'
export default {
    data() {
        return {
            tableData: [],
            pageStart: 1,
            pageSize: 10,
            total: 0,
            formInline: {
                title: ''
            },
            getTableDataUrl: '/v1/homework/getHomeworkList',
            loading: true
        }
    },
    created() {
        getTableData(this, this.getTableDataUrl)
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize = val;
            this.pageStart = 1;
            getTableData(this, this.getTableDataUrl,{ pageSize: this.pageSize, pageStart: this.pageStart,title:this.formInline.title});
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pageStart = val;
            getTableData(this, this.getTableDataUrl,{ pageSize: this.pageSize, pageStart: this.pageStart,title:this.formInline.title });
        },
        findHomeword() {
            getTableData(this, this.getTableDataUrl, this.formInline);
        },
        resetCondition() {
            this.formInline = {}
            getTableData(this, this.getTableDataUrl,this.formInline);
        },
        completedText(row, cloumn) {
            return row.completed ? '是' : '否';
        }
    },
    computed: {
        
    }
}
</script>

<style lang="scss" scoped>
.homeworkList {
    .el-pagination {
        text-align: center;
        margin-top: 20px;
    }
    .el-form-item ,.demo-form-inline{
        text-align: left;
    }
}
</style>