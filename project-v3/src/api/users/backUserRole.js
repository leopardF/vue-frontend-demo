import service from "@/service";

//学生列表查询接口
export function getStudentList(param){
    return service({
        method:'get',
        url:'/v1/student/getStudentList',
        params:param
    })
}

//删除学生信息接口
export function removeStudent(data){
    return service({
        method:'post',
        url:'/v1/student/removeStudentInfo',
        data:data
    })
}

//修改学生信息接口
export function updateStudent(data){
    return service({
        method:'post',
        url:'/v1/student/editStudentInfo',
        data:data
    })
}

//新增学生信息接口
export function addStudentInfo(data){
    return service({
        method:'post',
        url:'/v1/student/addStudentInfo',
        data:data
    })
}