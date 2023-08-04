import service from "@/service";
import qs from 'qs';
import {ElMessage, ElMessageBox} from "element-plus";

//获取表格数据
export function getData(tableData, total, url, params) {
    service.get(url, { params: params || {} })
        .then(res => {
            if (res.data.code === 200) {
                tableData.value = res.data.data.dataList
                total.value = res.data.data.total
            }
        })
        .catch(err => {
            throw err
        })
}

// 新增和修改方法的封装

export function addInfo(tableData, total,dialogFormVisible, pageStart, url, form, callback, callbackUrl) {
    // let data = qs.stringify(form);
    service.post(url, form)
        .then(res => {
            if (res.data.code === 200) {
                ElMessage({ message: '新增成功', type: 'success' })
            } else {
                ElMessage({ message: '新增失败', type: 'error' })
            }
            dialogFormVisible.value = false;
            pageStart.value = 1;
            callback(tableData,total, callbackUrl);
        })
        .catch(err => {
            throw err
        })
}

export function updateInfo(tableData, total,dialogFormVisible, url, form, callback, callbackUrl) {
    // let data = qs.stringify(form);
    service.post(url, form)
        .then(res => {
            if (res.data.code === 200) {
                ElMessage({ message: '更新成功', type: 'success' })
            } else {
                ElMessage({ message: '更新失败', type: 'error' })
            }
            dialogFormVisible.value = false;
            callback(tableData,total, callbackUrl);
        })
        .catch(err => {
            throw err
        })
}
export function changeInfo(tableData, total,dialogFormVisible, pageStart, url, form, callback, callbackUrl) {
    // let data = qs.stringify(form);
    service.post(url, form)
        .then(res => {
            if (res.data.code === 200) {
                ElMessage({ message: '操作成功', type: 'success' })
            } else {
                ElMessage({ message: '操作失败', type: 'error' })
            }
            dialogFormVisible.value = false;
            pageStart.value = 1;
            callback(tableData,total, callbackUrl);
        })
        .catch(err => {
            throw err
        })
}
// export function changeInfo(root,method, url, form, callback) {
//     let data = qs.stringify(form);
//     root.service[method](url, data)
//         .then(res => {
//             if (res.data.code === 200) {
//                 root.$message({ message: '新增成功', type: 'success' })
//             } else {
//                 root.$message({ message: '新增失败', type: 'error' })
//             }
//             root.dialogFormVisible = false;
//             root.pageStart = 1;
//             callback(root,url);
//             root.$refs[form].resetFields();
//         })
//         .catch(err => {
//             throw err
//         })
// }

//删除方法封装
export function delData(tableData,total, url, id, callback, callbackUrl) {

    ElMessageBox.confirm('确定要删除吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '关闭',
            type: 'warning',
        })
        .then(() => {
            service.post(url, { id: id })
            .then(res => {
                console.log(res)
                if (res.data.code === 200 && res.data.data === true) {
                    ElMessage({ message: '删除成功', type: 'success' })
                }
                callback(tableData,total, callbackUrl);
            })
            .catch(err => {
                throw err
            })
        })
        .catch(() => {
            ElMessage({ message: '已取消', type: 'success' })
        })
}

// ============================================================

//作业列表获取表格数据方法
export function getTableData(tableData, total, url, params){
    service.get(url, {params:params || {}})
    .then(res => {
        if (res.data.code === 200) {
            tableData.value = res.data.data.dataList
            total.value = res.data.data.total
        }
    })
    .catch(err => {
        throw err
    })
}

export function getTableData2(root, url, params){
    root.service.get(url, {params:params || {}})
    .then(res => {
        if (res.data.code === 200) {
            root.tableData = res.data.data.dataList
            root.total = res.data.data.total
        }
        root.loading = false;
    })
    .catch(err => {
        throw err
    })
}