import Vue from "vue";
// import VueRouter, { RouteConfig } from "vue-router";
// import HomeView from "../views/HomeView.vue";
import Router from "vue-router";


const routes: Array<any> = [
  // {
  //   path: "/",
  //   redirect: '/login',
  //   meta: {
  //     hidden: true
  //   }
  // },
  {
    path: '/',
    redirect: '/login',
    name: '首页',
    hidden: true,
    component: () => import('@/components/Login.vue'),
  },
  {
    name: 'Login',
    path: '/login',
    hidden: true,
    component: () => import('@/components/Login.vue'),
  },
  {
    name: 'NotFound',
    path: '*',
    hidden: true,
    component: () => import('@/components/NotFound.vue'),
  },
  {
    name: '学生管理',
    path: '/home',
    iconClass: 'fa fa-users',
    redirect: '/home/studentList',
    component: () => import('@/components/Home.vue'), //懒加载
    children: [
      {
        path: '/home/studentList',
        name: '学生列表',
        iconClass: 'fa fa-list',
        component: () => import('@/components/students/StudentList.vue')
      },
      {
        path: '/home/infoList',
        name: '信息列表',
        iconClass: 'fa fa-list-alt',
        component: () => import('@/components/students/InfoList.vue')
      },
      {
        path: '/home/infoManager',
        name: '信息管理',
        iconClass: 'fa fa-list-alt',
        component: () => import('@/components/students/InfoManage.vue')
      },
      {
        path: '/home/workList',
        name: '作业列表',
        iconClass: 'fa fa-list-ul',
        component: () => import('@/components/students/WorkList.vue')
      },
      {
        path: '/home/workManage',
        name: '作业管理',
        iconClass: 'fa fa-th-list',
        component: () => import('@/components/students/WorkManage.vue')
      }
    ]
  },
  {
    name: '数据分析',
    path: '/home',
    iconClass: 'fa fa-bar-chart',
    component: () => import('@/components/Home.vue'), //懒加载
    children: [
      {
        path: '/home/dataView',
        name: '数据概览',
        iconClass: 'fa fa-bar-chart',
        component: () => import('@/components/dataAnalysis/DataView.vue')
      },
      {
        path: '/home/mapView',
        name: '地图预览',
        iconClass: 'fa fa-line-chart',
        component: () => import('@/components/dataAnalysis/MapView.vue')
      },
      {
        path: '/home/scoreMap',
        name: '分数地图',
        iconClass: 'fa fa-line-chart',
        component: () => import('@/components/dataAnalysis/ScoreMap.vue')
      },
      {
        path: '/home/travelMap',
        name: '旅游地图',
        iconClass: 'fa fa-line-chart',
        component: () => import('@/components/dataAnalysis/TravelMap.vue')
      }
    ]
  },
  {
    name: '用户中心',
    path: '/users',
    iconClass: 'fa fa-user',
    component: () => import('@/components/Home.vue'), //懒加载
    children: [
      {
        path: '/users/user',
        name: '权限管理',
        iconClass: 'fa fa-user',
        component: () => import('@/components/users/User.vue')
      },
    ]
  },
];

Vue.use(Router);
const router = new Router({
  mode: "history",
  routes,
});

export default router;
