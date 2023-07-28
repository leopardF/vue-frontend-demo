<template>
    <div class="infoManager">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
            <el-form-item>
                <el-button type="primary" @click="addStudent">新增</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="name" label="姓名" align="center" width="100">
            </el-table-column>
            <el-table-column prop="age" label="年龄" align="center" width="68">
            </el-table-column>
            <el-table-column prop="sex" label="性别" align="center" width="68" :formatter="sexText">
            </el-table-column>
            <el-table-column prop="fatherName" label="父亲姓名" align="center" width="120">
            </el-table-column>
            <el-table-column prop="motherName" label="母亲姓名" align="center" width="120">
            </el-table-column>
            <el-table-column prop="enrollTime" label="入校时间" align="center" width="100">
            </el-table-column>
            <el-table-column prop="address" label="家庭住址" align="center" width="300">
            </el-table-column>
            <el-table-column prop="phone" label="联系方式" align="center" width="150">
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" icon="el-icon-edit" @click="editData(scope.row)"></el-button>
                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeData(scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageStart"
            :page-sizes="[5, 10, 20, 30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
        <el-dialog :title="state ? '添加學生信息' : '修改学生信息'" :visible.sync="dialogFormVisible" width="500px">
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="form.name" autocomplete="off" id="name"></el-input>
                </el-form-item>
                <el-form-item label="年齡" :label-width="formLabelWidth" prop="age">
                    <el-input v-model="form.age" autocomplete="off" id="age"></el-input>
                </el-form-item>
                <el-form-item label="性別" :label-width="formLabelWidth" prop="sex">
                    <el-radio v-model="form.sex" :label="1">男</el-radio>
                    <el-radio v-model="form.sex" :label="2">女</el-radio>
                </el-form-item>
                <el-form-item label="学号" :label-width="formLabelWidth" prop="number">
                    <el-input v-model="form.number" autocomplete="off" id="number"></el-input>
                </el-form-item>
                <el-form-item label="班级" :label-width="formLabelWidth" prop="clazz">
                    <el-input v-model="form.clazz" autocomplete="off" id="clazz"></el-input>
                </el-form-item>
                <el-form-item label="家庭住址" :label-width="formLabelWidth" prop="address">
                    <el-input v-model="form.address" autocomplete="off" id="address"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" :label-width="formLabelWidth" prop="phone">
                    <el-input v-model="form.phone" autocomplete="off" id="phone"></el-input>
                </el-form-item>
                <el-form-item label="父亲姓名" :label-width="formLabelWidth" prop="fatherName">
                    <el-input v-model="form.fatherName" autocomplete="off" id="fatherName"></el-input>
                </el-form-item>
                <el-form-item label="母亲姓名" :label-width="formLabelWidth" prop="motherName">
                    <el-input v-model="form.motherName" autocomplete="off" id="motherName"></el-input>
                </el-form-item>
                <el-form-item label="入校时间" :label-width="formLabelWidth" prop="enrollTime">
                    <el-date-picker v-model="form.enrollTime" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"
                        type="date" placeholder="选择日期" id="enrollTime">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeInfo('form')">取 消</el-button>
                <el-button type="primary" @click="onSumbit('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { getData, changeInfo,delData } from '@/api/table.js'
export default {
    data() {
        return {
            tableData: [],
            pageStart: 1,
            pageSize: 10,
            total: 0,
            formInline: {
                name: ''
            },
            dialogFormVisible: false,
            form: {
                name: '',
                age: '',
                sex: '',
                number: '',
                clazz: '',
                address: '',
                phone: '',
                fatherName: '',
                motherName: '',
                enrollTime: ''
            },
            formLabelWidth: '80px',
            rules: {
                name: [{ required: true, message: '请输入姓名' }],
                age: [{ required: true, message: '请输入年龄' }],
                sex: [{ required: true, message: '请输入性别' }],
                number: [{ required: true, message: '请输入学号' }],
                clazz: [{ required: true, message: '请输入班级' }],
                address: [{ required: true, message: '请输入地址' }],
                enrollTime: [{ required: true, message: '请输入入学时间' }],
                phone: [{ required: true, message: '请输入联系方式' }]
            },
            state: true,
            getDataUrl: '/v1/student/getStudentList'
        }
    },
    created() {
        getData(this, this.getDataUrl)
    },
    methods: {
        
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize = val;
            this.pageStart = 1;
            getData(this, this.getDataUrl, { pageSize: this.pageSize, pageStart: this.pageStart, name: this.formInline.name });
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pageStart = val;
            getData(this, this.getDataUrl,{ pageSize: this.pageSize, pageStart: this.pageStart, name: this.formInline.name });
        },
        closeInfo(form) {
            this.dialogFormVisible = false;
            this.$refs[form].resetFields();
        },
        removeData(row) {
            delData(this, '/v1/student/removeStudentInfo', row.id, getData, this.getDataUrl)
        },
        editData(row) {
            this.state = false;
            console.log(row);
            this.dialogFormVisible = true;
            this.form = { ...row };
        },
        addStudent() {
            this.form = {
                name: '',
                age: '',
                sex: '1',
                number: '',
                clazz: '',
                address: '',
                phone: '',
                fatherName: '',
                motherName: '',
                enrollTime: ''
            };
            this.state = true;
            this.dialogFormVisible = true;
        },
        onSumbit(form) {
            // console.log(form, this.form);
            this.$refs[form].validate(vaild => {
                if (vaild) {
                    // if (this.state) {
                    //     changeInfo(this, '/v1/student/addStudentInfo', this.form, getData,'/v1/student/getStudentList')
                    // } else {
                    //     changeInfo(this, '/v1/student/editStudentInfo', this.form, getData,'/v1/student/getStudentList')
                    // }
                    let methodUrl = this.state ? '/v1/student/addStudentInfo' : '/v1/student/editStudentInfo';
                    changeInfo(this, methodUrl, this.form, getData,this.getDataUrl);
                    this.$refs[form].resetFields();
                }
            })
        },
        sexText(row, cloumn) {
            return row.sex === 1 ? '男' : '女';
        }
    }
}
</script>

<style lang="scss" scoped>
.infoManager {
    .el-pagination {
        text-align: center;
        margin-top: 20px;
    }

    .el-form-item,
    .demo-form-inline {
        text-align: left;
    }
}
</style>