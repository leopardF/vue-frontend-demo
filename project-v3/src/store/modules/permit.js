import { getMenusListByUser } from "@/api/users/permit"
import { packageMenus } from "@/utils/format"
import defaultRouter from "@/router/defaultRouter"

const state = {
    asynd_router: [], //后端返回的路由
    all_router: [] // router/index.js + 后端返回的路由
}
const getters = {

}
const mutations = {
    SET_ROUTER(state, router) {
        state.asynd_router = router
        state.all_router = packageMenus(defaultRouter).concat(router)
    }
}
const actions = {
    actionGetPermission(context, params) {
        return new Promise((resolve, reject) => {
            getMenusListByUser()
                .then(response => {
                    const menuTree = packageMenus(response.data.data)
                    //更新路由
                    context.commit("SET_ROUTER", menuTree)
                    resolve()
                })
        })
    }
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
