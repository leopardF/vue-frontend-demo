import service from "@/service";


//修改角色权限信息接口
export function updateRoleMenus(data){
    return service({
        method:'post',
        url:'/v1/roleMenus/updateRoleMenus',
        data:data
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

//菜单树型列表查询接口
export function getMenusListByTree(param){
    return service({
        method:'get',
        url:'/v1/menus/getMenusListByTree',
        params:param
    })
}


//删除角色信息接口
export function removeRoleInfo(data){
    return service({
        method:'post',
        url:'/v1/role/removeRoleInfo',
        data:data
    })
}

//角色所拥菜单树型列表查询接口
export function getRoleMenusList(roleId){
    return service({
        method:'get',
        url:`/v1/roleMenus/getRoleMenusList/` + roleId
    })
}


//新增角色信息接口
export function addRoleInfo(data){
    return service({
        method:'post',
        url:'/v1/role/addRoleInfo',
        data:data
    })
}

//修改角色权限信息接口
export function updateRoleInfo(data){
    return service({
        method:'post',
        url:'/v1/role/updateRoleInfo',
        data:data
    })
}
