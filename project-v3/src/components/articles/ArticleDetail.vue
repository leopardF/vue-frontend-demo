<template>
    <div class="articleInfoDetail">
        <el-form :model="form" :rules="rules" ref="formRef">
            <el-row>
                <el-col :span="11">
                    <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
                        <el-input v-model="form.title" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="是否禁用" :label-width="formLabelWidth" prop="isDisable">
                        <el-radio-group v-model="form.isDisable">
                            <el-radio label="0" size="" border>启用</el-radio>
                            <el-radio label="1" size="" border>禁用</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="banner" :label-width="formLabelWidth" prop="bannerPic">
                <el-input v-model="form.bannerPic" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="内容" :label-width="formLabelWidth" prop="content">
                <el-input
                    v-model="form.content"
                    :autosize="{ minRows: 6, maxRows: 10 }"
                    type="textarea"
                    placeholder="Please input"
                />
            </el-form-item>
            <el-form-item label="文件名" :label-width="formLabelWidth" prop="fileName">
                <el-input v-model="form.fileName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="文件路径" :label-width="formLabelWidth" prop="filePath">
                <el-input v-model="form.filePath" autocomplete="off"></el-input>
            </el-form-item>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="发布时间" :label-width="formLabelWidth" prop="publicTime">
                        <el-date-picker v-model="form.publicTime" format="YYYY 年 MM 月 DD 日" value-format="YYYY-MM-DD"
                            type="date" placeholder="发布日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-form-item label="排序" :label-width="formLabelWidth" prop="sort">
                    <el-input v-model="form.sort" autocomplete="off"></el-input>
                </el-form-item>
            </el-row>
        </el-form>
        <div class="dialog-footer">
            <span>
                <el-button @click="closeInfo">返 回</el-button>
                <el-button type="primary" @click="onSumbit(formRef)">确 定</el-button>
            </span>
        </div>
    </div>
</template>
<script setup>
import {  addInfo,updateInfo,getDataByUrl } from '@/api/table.js'
import {ElMessage} from "element-plus";
import { onMounted, reactive, ref} from 'vue'
const tableData = ref([]);
const formInline = reactive({
    searchName: ''
});
const formLabelWidth = '100px';
const getTableDataUrl = '/v1/articleInfo/getArticleInfoList';
const initForm = {
    title: '',
    bannerPic: '',
    content: '',
    fileName: '',
    filePath: '',
    publicTime: '',
    sort: '',
    isDisable: '',
};
const form = reactive({...initForm});



onMounted(()=>{

});


const addArticleInfo = () => {
    
}
</script>

<style scoped lang="scss">
.articleInfoDetail{
    width: 70%;
    .dialog-footer{
        text-align: right;
    }
}
</style>