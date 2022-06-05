import {
    createRouter, createWebHashHistory, RouteRecordRaw,
} from 'vue-router'
import { cancelRequest } from '@/utils/axios'

const routes: Array<RouteRecordRaw> = [
    { path: '/', name: 'Home', component: () => import('views/home/index.vue')},
    { path: '/test', name: 'Test', component: () => import('views/test.vue')}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    cancelRequest()
    next()
})

export default router
