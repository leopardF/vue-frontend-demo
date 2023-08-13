import service from "@/service";


export function loginSum(data){
    return service({
        method:'post',
        url:'/v1/loginToken',
        data:data
    })
}