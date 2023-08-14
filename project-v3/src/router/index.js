import { createRouter, createWebHashHistory}  from 'vue-router'
import store from '@/store'

const routes = [{
    path: '/',
    hidden: true,
    name: '首页',
    meta: {
        label: '首页',
    },
    redirect: '/admin',
    component: () => import('@/components/Admin')
},
{
    path: '/admin',
    hidden: true,
    name: 'Admin',
    meta: {
        label: 'Admin',
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
];


const router = createRouter({
    history: createWebHashHistory(),
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
        console.log("to - " , to)
        console.log("store.state.permit.all_router -1 " , store.state.permit.all_router)
        if(store.state.permit.all_router.length === 0){
            store.dispatch("permit/actionGetPermission")
            .then(() => {
                // 更新静态路由
                const allRouter = store.state.permit.all_router
                router.options.routes = allRouter
                //更新动态路由
                const asyncRouter = store.state.permit.asynd_router
                asyncRouter.forEach(item => {
                    router.addRoute(item)
                })
                //判断是否为中转路由
                if(to.name === 'Admin' || to.path === '/' ){
                    const first_router = asyncRouter[0]?.children[0] || asyncRouter[0]
                    next({...first_router,replace: true})
                }else{
                    
                    // next() 动态路由更新完成后执行
                    // next({...to,replace: true})
                    next({path: to.path})
                    // router.replace(to)
                }
            })
            .catch(err => {
                console.log("err" , err)
            })
        }else{
            if(to.name === 'Login'){
                router.go(-1)
            }else {
                if(to.name === 'Admin' || to.path === '/' ){
                    const asyncRouter = store.state.permit.asynd_router
                    const first_router = asyncRouter[0]?.children[0] || asyncRouter[0]
                    next({...first_router,replace: true})
                }else{
                    next()
                }
            }
        }

    }
})


export default router