import Vue from 'vue'
import vueRouter from 'vue-router'
Vue.use(vueRouter)

const router = new vueRouter({
    mode: 'hash',
    linkActiveClass:'active', //路由高亮设置 linkExactActiveClass或者linkActiveClass
    routes: [
        {
            path: '/',
            name: 'root',
            redirect: '/home',
            meta: { requireAuth: true },
            component: () => import('@/components/MyHome'),
            children: [{
                path: 'home',
                name: 'Home',
                meta: { requireAuth: true },
                component: () => import('@/components/MyFirst')
            },
            {
                path: 'trade',
                name: 'Trade',
                meta: { requireAuth: true },
                component: () => import('@/components/MyTrade')
            },
            {
                path: 'my',
                name: 'My',
                meta: { requireAuth: true },
                component: () => import('@/components/MyPage')
            }]
        },
        {
            path: '/login',
            name: 'Login',
            meta: { requireAuth: false },
            component: () => import('@/components/MyLogin')
        },
    ]
})
//进入页面之前判断用户是否登录
router.beforeEach((to, from, next) => {
    // console.log(to);
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (sessionStorage.getItem('token')) {  // 获取用户登录信息
            next();
        } else {
            next({
                path: '/login',
                query: { redirects: from.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
})



export default router