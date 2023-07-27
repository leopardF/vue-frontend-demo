
import Vue from 'vue';
import Router from 'vue-router';
// import Home from '../components/Home.vue';

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login',
            hidden: true,
            component: resolve => require(['@/components/Login'], resolve) //异步
        },
        {
            name: 'Login',
            path: '/login',
            hidden: true,
            component: resolve => require(['@/components/Login'], resolve) //异步
        },
        {
            name: 'NotFound',
            path: '*',
            hidden: true,
            component: resolve => require(['@/components/NotFound'], resolve) //异步
        },
        // {
        //     name: 'Home',
        //     path: '/home',
        //     component: resolve => require(['@/components/Home'], resolve) //异步
        // },
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
                    name: '用户列表',
                    iconClass: 'fa fa-user',
                    component: () => import('@/components/users/User')
                },
            ]
        },
    ],
    mode: 'history'
});