//项目中我们大多数时候都会把对应的接口请求封装成API来调用
import service from "@/service";


//登录接口
export function login(data){
    return service({
        method:'post',
        url:'/v1/loginToken',
        data:data
    })
}


//获取权限列表
export function getMenusListByUserId(userId){
    return service({
        method:'get',
        url: `/v1/menus/getMenusListByUserId/` + userId
    })
}


//==========================================================================
export function postWay(url, data){
    return service.post(url,data)
}

//学生列表查询接口
export function getWay(url, param){
    return service({
        method:'get',
        url:url,
        params:param
    })
}
