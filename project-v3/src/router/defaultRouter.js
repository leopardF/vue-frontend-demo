export default [{
    menuUrl: '/',
    isHidden: true,
    menuName: '首页',
    meta: {
        label: '首页'
    },
    pageUrl: '/Admin',
    iconClazz: '',
    childrenList: [],
    redirect: "/Admin"
},
{
    menuUrl: '/login',
    isHidden: true,
    menuName: 'Login',
    meta: {
        label: '登录'
    },
    pageUrl: '/Login',
    iconClazz: '',
    childrenList: []
},
{
    pamenuUrlth: "/:catchAll(.*)",
    isHidden: true,
    menuName: 'NotFound',
    meta: {
        label: '未发现'
    },
    pageUrl: '/NotFound',
    iconClazz: '',
    childrenList: []
},
{
    menuUrl: '/401',
    isHidden: true,
    menuName: 'NotPermission',
    meta: {
        label: '无权限'
    },
    pageUrl: '/NotPermission',
    iconClazz: '',
    childrenList: []
}
]
