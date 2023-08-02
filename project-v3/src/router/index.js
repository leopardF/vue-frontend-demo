import { createRouter, createWebHistory}  from 'vue-router'
import { getCurrentInstance } from 'vue';

const routes = [
    {
        path: '/',
        hidden: true,
        name: '首页',
        component: () => import('@/components/Login')
    },
    {
        name: 'Login',
        path: '/login',
        hidden: true,
        component: () => import('@/components/Login')
    },
    {
        name: 'NotFound',
        path: '/:catchAll(.*)',
        hidden: true,
        component: () => import('@/components/NotFound')
    },
    {
        name: 'NotPermission',
        path: '/401',
        hidden: true,
        component: () => import('@/components/NotPermission')
    },
    {
        name: 'Admin',
        path: '/admin',
        hidden: true,
        component: () => import('@/components/Admin')
    },
    {
        name: '学生管理',
        path: '/home',
        iconClass: 'fa fa-users',
        redirect: '/home/studentList',
        component: ()=> import('@/components/Home'), //懒加载
        children:[
            {
                path: '/home/studentList',
                name: '学生列表',
                iconClass: 'fa fa-list',
                component: () => import('@/components/students/StudentList')
            },
            {
                path: '/home/infoList',
                name: '信息列表',
                iconClass: 'fa fa-list-alt',
                component: () => import('@/components/students/InfoList')
            },
            {
                path: '/home/infoManager',
                name: '信息管理',
                iconClass: 'fa fa-list-alt',
                component: () => import('@/components/students/InfoManage')
            },
            {
                path: '/home/workList',
                name: '作业列表',
                iconClass: 'fa fa-list-ul',
                component: () => import('@/components/students/WorkList')
            },
            {
                path: '/home/workManage',
                name: '作业管理',
                iconClass: 'fa fa-th-list',
                component: () => import('@/components/students/WorkManage')
            }
        ]
    },
    {
        name: '数据分析',
        path: '/home',
        iconClass: 'fa fa-bar-chart',
        component: ()=> import('@/components/Home'), //懒加载
        children:[
            {
                path: '/home/dataView',
                name: '数据概览',
                iconClass: 'fa fa-bar-chart',
                component: () => import('@/components/dataAnalysis/DataView')
            },
            {
                path: '/home/mapView',
                name: '地图预览',
                iconClass: 'fa fa-line-chart',
                component: () => import('@/components/dataAnalysis/MapView')
            },
            {
                path: '/home/scoreMap',
                name: '分数地图',
                iconClass: 'fa fa-line-chart',
                component: () => import('@/components/dataAnalysis/ScoreMap')
            },
            {
                path: '/home/travelMap',
                name: '旅游地图',
                iconClass: 'fa fa-line-chart',
                component: () => import('@/components/dataAnalysis/TravelMap')
            }
        ]
    },
    {
        name: '用户中心',
        path: '/users',
        iconClass: 'fa fa-user',
        component: ()=> import('@/components/Home'), //懒加载
        children:[
            {
                path: '/users/user',
                name: '权限管理',
                iconClass: 'fa fa-user',
                component: () => import('@/components/users/User')
            },
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

//路由导航守卫
const whiteList = ['/login','/404','/401'];
router.beforeEach((to, from, next) => {
    if (!localStorage.getItem("token")) {
        // if (to.path !== '/login') {
        if (!whiteList.includes(to.path)) {
            next('/login?redirect=' + to.path )
        } else {
            next()
        }
    } else {
        
        // 后续的是否登录应该从本地存储获取后重新验证
        // 判断是否已经动态生成莱单
        // 如果生成 next
        // 否则现场请求后台生成菜巾

        next()
        //判断动态路由菜单
        // if( 'xx' === undefined){    //临时写个，判断存在菜单
        //     next()
        // }else{
        //     //没有菜单
        //     //发请求获取路由生成菜单
        //     loadMenus( next, to );
        // }

    }
})

import axios from 'axios' 

function loadMenus(next , to){

    //发起请求获取后端路由接口数据
    axios.post("/")
    .then( res => {

    })
    .catch( err => {

    })

    //处理 ‘xxx’

    // 最终放行
    next({...to, replace:true});
}

export default router