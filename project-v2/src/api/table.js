
//获取表格数据
export function getData(root, url, params) {
    root.service.get(url, { params: params || {} })
        .then(res => {
            if (res.data.code === 200) {
                root.tableData = res.data.data.dataList
                root.total = res.data.data.total
            }
        })
        .catch(err => {
            throw err
        })
}

// 新增和修改方法的封装
import qs from 'qs'
export function changeInfo(root, url, form, callback, callbackUrl) {
    // let data = qs.stringify(form);
    root.service.post(url, form)
        .then(res => {
            if (res.data.code === 200) {
                root.$message({ message: '操作成功', type: 'success' })
            } else {
                root.$message({ message: '操作失败', type: 'error' })
            }
            root.dialogFormVisible = false;
            root.pageStart = 1;
            callback(root, callbackUrl);
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
export function delData(root, url, id, callback, callbackUrl) {
    root.$alert('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        callback: () => {
            root.service.post(url, { id: id })
                .then(res => {
                    console.log(res)
                    if (res.data.code === 200 && res.data.data === true) {
                        root.$message({ message: '删除成功', type: 'success' })
                    }
                    callback(root, callbackUrl);
                })
                .catch(err => {
                    throw err
                })
        }
    })
}

// ============================================================

//作业列表获取表格数据方法
export function getTableData(root, url, params){
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