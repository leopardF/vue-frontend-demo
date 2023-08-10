export default [
    {path: '/', hidden: true, name: '首页', meta: { label: '首页' }, component: 'Admin',  iconClass: ''},
    {path: '/login', hidden: true, name: 'Login', meta: { label: '登录' }, component: 'Login',  iconClass: ''},
    {path: '/:catchAll(.*)', hidden: true, name: 'NotFound', meta: { label: '未发现' }, component: 'NotFound',  iconClass: ''},
    {path: '/401', hidden: true, name: 'NotPermission', meta: { label: '无权限' }, component: 'NotPermission',  iconClass: ''}
]
