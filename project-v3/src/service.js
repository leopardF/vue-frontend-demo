import axios from "axios";
import { getToken } from "./utils/setToken.js";
import {ElMessage} from "element-plus";
import router from './router'

const service = axios.create({
    baseURL:'/api', //baseURL会自动加载在请求地址上
    timeout: 8000,

})

//添加请求拦截器
service.interceptors.request.use((config)=>{
    //在请求之前做些什么(获取并设置token)
    const token = getToken('token');
    // const requestedPath = config.url;
    // if (token && requestedPath === '/') {
    //     // Redirect to a specific path
    //     router.push('/home/studentList'); // Replace with the desired path
    //   } else {
        // Set token in the request header
        config.headers['token'] = token;
    //   }

    return config;
},(error) => {
    return Promise.reject(error);
})




//添加响应拦截器
service.interceptors.response.use((response)=>{
    //对响应数据做。。。
    let {code,message} = response.data;
    if(code !== 200){
        if (code === 401){
            router.replace('/401')
        }
        if (code === 404){
            router.replace('/:catchAll(.*)')
        }
        ElMessage({message: message || 'error', type:'warning'})
    }
    return response;
},(error) => {
    return Promise.reject(error);
})

export default service;