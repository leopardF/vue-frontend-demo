import { createRouter, createWebHistory}  from 'vue-router'
import { getCurrentInstance } from 'vue';
import defaultRouter from "@/router/defaultRouter.js"
import { getMenusListByUserId } from '@/api/api.js';

const routes = [{
    path: '/',
    hidden: true,
    name: '首页',
    meta: {
        label: '首页',
    },
    component: () => import('@/components/Admin')
},
{
    name: 'Login',
    path: '/login',
    hidden: true,
    meta: {
        label: '登录',
    },
    component: () => import('@/components/Login')
},
{
    name: 'NotFound',
    path: '/:catchAll(.*)',
    hidden: true,
    meta: {
        label: '未发现',
    },
    component: () => import('@/components/NotFound')
},
{
    name: 'NotPermission',
    path: '/401',
    hidden: true,
    meta: {
        label: '无权限',
    },
    component: () => import('@/components/NotPermission')
},
{
    name: '学生管理',
    path: '/home',
    iconClass: 'fa fa-users',
    meta: {
        label: '学生管理',
    },
    redirect: '/home/studentList',
    component: ()=> import('@/components/Home'), //懒加载
    children:[
        {
            path: '/home/studentList',
            name: '学生列表',
            iconClass: 'fa fa-list',
            meta: {
                label: '学生列表',
            },
            component: () => import('@/components/students/StudentList')
        },
        {
            path: '/home/infoList',
            name: '信息列表',
            iconClass: 'fa fa-list-alt',
            meta: {
                label: '信息列表',
            },
            component: () => import('@/components/students/InfoList')
        },
        {
            path: '/home/infoManager',
            name: '信息管理',
            iconClass: 'fa fa-list-alt',
            meta: {
                label: '信息管理',
            },
            component: () => import('@/components/students/InfoManage')
        },
        {
            path: '/home/workList',
            name: '作业列表',
            iconClass: 'fa fa-list-ul',
            meta: {
                label: '作业列表',
            },
            component: () => import('@/components/students/WorkList')
        },
        {
            path: '/home/workManage',
            name: '作业管理',
            iconClass: 'fa fa-th-list',
            meta: {
                label: '作业管理',
            },
            component: () => import('@/components/students/WorkManage')
        }
    ]
},
{
    name: '运营管理',
    path: '/home',
    iconClass: 'fa fa-file-text',
    redirect: '/home/studentList',
    component: ()=> import('@/components/Home'), //懒加载
    children:[
        {
            path: '/home/articleList',
            name: '文章管理',
            iconClass: 'fa fa-file-word-o',
            meta: {
                label: '文章管理',
            },
            component: () => import('@/components/articles/ArticleList')
        },
        {
            path: '/home/articleDetail',
            name: '文章详情',
            iconClass: 'fa fa-file-word-o',
            hidden: true,
            meta: {
                label: '文章详情',
            },
            component: () => import('@/components/articles/ArticleDetail')
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
            meta: {
                label: '数据概览',
            },
            component: () => import('@/components/dataAnalysis/DataView')
        },
        {
            path: '/home/mapView',
            name: '地图预览',
            iconClass: 'fa fa-line-chart',
            meta: {
                label: '地图预览',
            },
            component: () => import('@/components/dataAnalysis/MapView')
        },
        {
            path: '/home/scoreMap',
            name: '分数地图',
            iconClass: 'fa fa-line-chart',
            meta: {
                label: '分数地图',
            },
            component: () => import('@/components/dataAnalysis/ScoreMap')
        },
        {
            path: '/home/travelMap',
            name: '旅游地图',
            iconClass: 'fa fa-line-chart',
            meta: {
                label: '旅游地图',
            },
            component: () => import('@/components/dataAnalysis/TravelMap')
        }
    ]
},
{
    name: '用户中心',
    path: '/users',
    iconClass: 'fa fa-user',
    meta: {
        label: '用户中心',
    },
    component: ()=> import('@/components/Home'), //懒加载
    children:[
        {
            path: '/users/getBackgroundUserList',
            name: '用户管理',
            iconClass: 'fa fa-user',
            meta: {
                label: '用户管理',
            },
            component: () => import('@/components/users/BackUserList')
        },
        {
            path: '/users/roleList',
            name: '角色管理',
            iconClass: 'fa fa-user',
            meta: {
                label: '角色管理',
            },
            component: () => import('@/components/users/RoleList')
        },
        {
            path: '/users/permission',
            name: '权限管理',
            iconClass: 'fa fa-user',
            meta: {
                label: '权限管理',
            },
            component: () => import('@/components/users/Permission')
        },
    ]
},];
const packageMenus = (data) => {
    let temp = [];
    data.forEach(item => {
        const childrenTemp = [];
        if(item.childrenList && item.childrenList.length > 0){
            packageMenus(item.childrenList).forEach(info => {
                childrenTemp.push(info)
            })
        }
        let tempRoute = {
            id: item.id,
            name: item.menuName,
            path: item.menuUrl,
            iconClass: item.iconClazz,
            meta: {
                label: item.menuName,
            },
            hidden: item.isHidden === undefined ? false : item.isHidden,
            component: ()=> import(`@/components${item.pageUrl}`), //懒加载
            children: childrenTemp
        }
        temp.push(tempRoute)
    })
    return temp;
}
// packageMenus(defaultRouter).forEach(info => {
//     routes.push(info)
// })

// console.log(routes[0].component);


const router = createRouter({
    history: createWebHistory(),
    routes
})

//路由导航守卫
const whiteList = ['/login','/404','/401'];
router.beforeEach(async(to, from, next) => {
    if (!localStorage.getItem("token")) {
        // if (to.path !== '/login') {
        if (!whiteList.includes(to.path)) {
            next('/login?redirect=' + to.path )
        } else {
            next()
        }
    } else {
        // let resp = await getMenusListByUserId(1);
        // let dataList = packageMenus(resp.data.data);
        // dataList.forEach(dataObject => {
        //     if(!router.hasRoute(dataObject.name)){
        //         router.addRoute(dataObject)
        //     }
        // });


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