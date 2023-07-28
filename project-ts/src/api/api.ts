//项目中我们大多数时候都会把对应的接口请求封装成API来调用
import service from "@/service.js";
import { IUserData } from "../types";


//登录接口
export function login(data: IUserData){
    return service({
        method:'post',
        url:'/v1/loginToken',
        data:data
    })
}

//学生列表查询接口
//这种一般不做ts限制，用any就好了，因为变化太大
export function getStudentList(param: any){
    return service({
        method:'get',
        url:'/v1/student/getStudentList',
        params:param
    })
}

//删除学生信息接口
export function removeStudent(data: any){
    return service({
        method:'post',
        url:'/v1/student/removeStudentInfo',
        data:data
    })
}

//删除学生信息接口
// export function removeStudent(id){
//     return service({
//         method:'post',
//         url:'/v1/student/removeStudentInfo/${id}'
//     })
// }

//修改学生信息接口
export function updateStudent(data: any){
    return service({
        method:'post',
        url:'/v1/student/editStudentInfo',
        data:data
    })
}

//新增学生信息接口
export function addStudentInfo(data: any){
    return service({
        method:'post',
        url:'/v1/student/addStudentInfo',
        data:data
    })
}

//新增和修改共用
// export function addAndUpdateStudentInfo(type, data){
//     // qs.stringify()  可以让数据 {'a':'1','b':'2'} => a=1&b=2   ,不过现在用json格式，不需要转化
//     let obj = {
//         method:type,    //新增用 post，新增 put
//         url:'/v1/student/addAndUpdateStudentInfo',
//         data:data
//     }
//     return service(obj)
// }

//数据概览的接口
export function getDataView(){
    return service({
        method:'get',
        url:'/v1/data/getDataViewList'
    })
}

//旅游数据概览的接口
export function getTrabelView(){
    return service({
        method:'get',
        url:'/v1/data/getTravelViewList'
    })
}