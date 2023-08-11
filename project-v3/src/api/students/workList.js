import service from "@/service";

//列表查询接口
export function getHomeWorkList(param){
    return service({
        method:'get',
        url:'/v1/homework/getHomeworkList',
        params:param
    })
}

//删除信息接口
export function removeHomeWork(data){
    return service({
        method:'post',
        url:'/v1/homework/removeHomeworkInfo',
        data:data
    })
}

//修改信息接口
export function updateHomeWork(data){
    return service({
        method:'post',
        url:'/v1/homework/editHomeworkInfo',
        data:data
    })
}

//新增信息接口
export function addHomeWork(data){
    return service({
        method:'post',
        url:'/v1/homework/addHomeworkInfo',
        data:data
    })
}