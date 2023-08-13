import service from "@/service";

//修改用户角色信息
export function updateBackUserRole(data){
    return service({
        method:'post',
        url:'/v1/backUserRole/updateBackUserRole',
        data:data
    })
}

//用户列表查询接口
export function getBackUserList(param){
    return service({
        method:'get',
        url:'/v1/user/getBackgroundUserList',
        params:param
    })
}

//角色列表查询接口
export function getRoleList(param){
    return service({
        method:'get',
        url:'/v1/role/getRoleList',
        params:param
    })
}

//删除信息接口
export function removeBackUser(data){
    return service({
        method:'post',
        url:'/v1/user/removeBackgroundUserInfo',
        data:data
    })
}

//用户所拥角色列表查询接口
export function getUserRoleList(userId){
    return service({
        method:'get',
        url:`/v1/backUserRole/getBackUserRoleList/` + userId
    })
}

//修改信息接口
export function updateBackUserInfo(data){
    return service({
        method:'post',
        url:'/v1/user/editBackgroundUserInfo',
        data:data
    })
}

//新增信息接口
export function addBackUserInfo(data){
    return service({
        method:'post',
        url:'/v1/user/addBackgroundUserInfo',
        data:data
    })
}