
import service from "@/service";

//角色列表查询接口
export function getMenusListByUser(param){
    return service({
        method:'get',
        url:'/v1/menus/getMenusListByUserId',
        params:param
    })
}