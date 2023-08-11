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
                            <el-radio :label=false size="" border>启用</el-radio>
                            <el-radio :label=true size="" border>禁用</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="banner" :label-width="formLabelWidth" prop="bannerPic">
                <el-upload ref="imgUploadRef" action="/api/v1/files/upload" list-type="picture-card" :auto-upload="true"
                :on-success="handleUploadSuccess"
                :on-error="handleUploadError" :limit="1" accept=".png,.jpg,.jpeg" :file-list="imgFiles">
                    <el-icon><Plus /></el-icon>
                    <template #file="{ file }">
                        <div>
                            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                            <span class="el-upload-list__item-actions">
                                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)" > <el-icon><zoom-in /></el-icon> </span>
                                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)" > <el-icon><Download /></el-icon> </span>
                                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)" > <el-icon><Delete /></el-icon> </span>
                            </span>
                        </div>
                    </template>
                </el-upload>
                <el-dialog v-model="dialogVisible">
                    <img w-full :src="dialogImageUrl" alt="Preview Image" style="max-width: 100%;"/>
                </el-dialog>
            </el-form-item>
            <el-form-item label="内容" :label-width="formLabelWidth" prop="content">
                <el-input
                    v-model="form.content"
                    :autosize="{ minRows: 6, maxRows: 10 }"
                    type="textarea"
                    placeholder="Please input"
                />
            </el-form-item>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="发布时间" :label-width="formLabelWidth" prop="publishTime">
                        <el-date-picker v-model="form.publishTime" format="YYYY 年 MM 月 DD 日" value-format="YYYY-MM-DD"
                            type="date" placeholder="发布日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-form-item label="排序" :label-width="formLabelWidth" prop="sort">
                    <el-input v-model="form.sort" autocomplete="off"></el-input>
                </el-form-item>
            </el-row>
            <el-form-item label="上传文件" :label-width="formLabelWidth" prop="fileName">
                <el-upload ref="fileUploadRef" class="upload-demo" action="/api/v1/files/upload" :limit="1" :on-exceed="handleExceed" :auto-upload="true"
                :on-success="handleFileUploadSuccess"
                :on-error="handleUploadError"  accept=".png,.jpg,.jpeg,.doc,.docx,.txt,.xls,.xlsx" :file-list="fileFiles" >
                    <template #trigger>
                        <el-button type="primary">select file</el-button>
                    </template>
                 <template #tip>
                   <div class="el-upload__tip text-red">
                     limit 1 file, new file will cover the old file
                   </div>
                 </template>
                </el-upload>
            </el-form-item>
        </el-form>
        <div class="dialog-footer">
            <span>
                <el-button @click="backPage">返 回</el-button>
                <el-button type="primary" @click="onSumbit()" v-if="state">新 增</el-button>
                <el-button type="primary" @click="onSumbit()" v-if="!state">更 新</el-button>
            </span>
        </div>
    </div>
</template>
<script setup>
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue';
import { onMounted, reactive, ref } from 'vue';
import { addArticleInfo, updateArticleInfo, getArticleInfoDetail } from '@/api/articles/articles.js'
import { useRouter,useRoute } from 'vue-router';
import { ElMessage } from "element-plus";
const route = useRoute();
const router = useRouter();
const formLabelWidth = '100px';
const initForm = {
    title: '',
    bannerPic: '',
    content: '',
    fileName: '',
    filePath: '',
    publishTime: '',
    sort: '',
    isDisable: ref(false),
};
const form = reactive({ ...initForm });
const rules = {
    // userName: [{ required: true, message: '请输入角色名' }],

};

const dialogImageUrl = ref('');//预览图片路径
const dialogVisible = ref(false);//预览弹窗
const disabled = ref(false);//下载-删除按钮展示
const imgUploadRef = ref(null);
const fileUploadRef = ref(null);
const imgFiles = ref([]);
const fileFiles = ref([]);
const state = ref(true);


onMounted(() => {
    const articleInfoId = route.query.articleInfoId;
    let temp = state.value = route.query.state === 'true';
    if(route.query.state === undefined){
        temp = true;
    }
    console.log(temp , !temp)
    if(!temp){
        getArticleInfoDetail(articleInfoId)
        .then(res => {
            if (res.data.code === 200) {
                if(res.data.data === null || res.data.data === undefined){
                    ElMessage({ message: '数据查询不到', type: 'error' })
                }else {
                    Object.assign(form, res.data.data);
                    console.log("form",form);
                    imgFiles.value.push({
                        uid: '',
                        name: '',
                        url: form.bannerPic // 服务器返回的图片 URL
                    });
                    fileFiles.value.push({
                        uid: '',
                        name: form.fileName,
                        url: form.filePath // 服务器返回的图片 URL
                    });
                }
            } else {
                ElMessage({ message: '获取数据失败', type: 'error' })
            }
        })
        .catch(err => {
            throw err
        })
    }
    
});

const handleRemove = (file) => {
    console.log(file);
    form.bannerPic = '';
    dialogImageUrl.value = '';
    imgUploadRef.value.clearFiles();
}

const handlePictureCardPreview = (file) => {
    if (file && file.url) {
        dialogImageUrl.value = file.url;
    }
    dialogVisible.value = true
}

//图片下载
const handleDownload = (file) => {
    console.log(file)
    const link = document.createElement('a');
    link.href = file.url; // 设置图片链接
    link.download = file.name; // 设置下载时的文件名
    link.target = '_blank'; // 在新窗口中打开链接
    link.click(); // 触发点击事件进行下载
}

//图片上传成功回调
const handleUploadSuccess = (res, file) => {
    if (res.code === 200) {
        ElMessage.success('上传成功')
        form.bannerPic = res.data;
    } else {
        ElMessage.error('上传失败')
    }
}
//文件超出限制回调
const handleExceed = (files) => {
    fileUploadRef.value?.clearFiles();
    const file = files[0];
    file.uid = genFileId();
    fileUploadRef.value?.handleStart(file);
}
//文件上传成功回调
const handleFileUploadSuccess = (res, file) => {
    if (res.code === 200) {
        ElMessage.success('上传成功')
        form.fileName = file.name;
        form.filePath = res.data;
    } else {
        fileUploadRef.value?.clearFiles();
        ElMessage.error('上传失败')
    }
}
//上传异常回调
const handleUploadError = (err, file) => {
    ElMessage.error('上传失败，请重试')
}
//提交
const formRef = ref({});
const onSumbit = () => {
    formRef.validate(vaild => {
        if (vaild) {
            const methodChange = state.value ? addArticleInfo(form) : updateArticleInfo(form);
            methodChange.then(res => {
                if (res.data.code === 200) {
                    ElMessage({ message: state.value ? '新增成功' : '编辑成功', type: 'success' })
                    backPage()
                } else {
                    ElMessage({ message: state.value ? '新增失败' : '编辑失败', type: 'error' })
                }
            }) 
            .catch(err => {
                ElMessage({ message: '处理异常', type: 'error' })
                throw err
            })
        } else {
            // 验证不通过，显示错误信息
            ElMessage({ message: '表单数据验证失败', type: 'error' });
        }
    })

}

//返回
const backPage = () => {
    router.push({ path: "/home/articleList" })
}

</script>

<style scoped lang="scss">
.articleInfoDetail{
    width: 70%;
    .dialog-footer{
        text-align: right;
    }
    .upload-demo{
        text-align: left;
    }
}
</style>