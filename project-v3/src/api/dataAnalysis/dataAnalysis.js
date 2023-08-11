import service from "@/service";

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