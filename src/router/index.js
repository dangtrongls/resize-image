import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import ResizeImage from '../views/ResizeImage.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/resize/shopee',
        name: 'Shopee',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "shopee" */ '../views/Shopee.vue')
    },
    {
        path: '/resize/facebook',
        name: 'Shopee',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "facebook" */ '../views/Facebook.vue')
    },
    {
        path: '/resize/watermark',
        name: 'Watermark',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "watermark" */ '../views/Watermark.vue')
    },
    {
        path: '/resize/tiktok',
        name: 'Tiktok',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "tiktok" */ '../views/Tiktok.vue')
    },
    {
        path: '/resize/instagram',
        name: 'Instagram',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "instagram" */ '../views/Instagram.vue')
    },
    {
        path: '/resize/facebook',
        name: 'Watermark',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "watermark" */ '../views/Facebook.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router