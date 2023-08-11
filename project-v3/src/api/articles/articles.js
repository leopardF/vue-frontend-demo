import service from "@/service";

//文章列表查询接口
export function getArticleInfoList(param){
    return service({
        method:'get',
        url:'/v1/articleInfo/getArticleInfoList',
        params:param
    })
}

//文章基础查询接口
export function getArticleInfoDetail(id){
    return service({
        method:'get',
        url:'/v1/articleInfo/getArticleInfoList/' + id
    })
}


//删除文章信息接口
export function removeArticleInfo(data){
    return service({
        method:'post',
        url:'/v1/articleInfo/removeArticleInfoInfo',
        data:data
    })
}

//修改文章信息接口
export function updateArticleInfo(data){
    return service({
        method:'post',
        url:'/v1/articleInfo/editArticleInfoInfo',
        data:data
    })
}

//新增文章信息接口
export function addArticleInfo(data){
    return service({
        method:'post',
        url:'/v1/articleInfo/addArticleInfoInfo',
        data:data
    })
}