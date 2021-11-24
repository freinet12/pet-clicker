import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import UploadForm from '@/components/UploadForm';

const routes = [
    {
        path: '/',
        name: 'Default',
        redirect: '/auth/login',
    },
    {
        path: '/auth/login',
        component: () => import(/* webpackChunkName: "login" */ '@/views/auth/Login.vue'),
    },
    {
        path: '/auth/register',
        component: () => import(/* webpackChunkName: "register" */ '@/views/auth/Register.vue'),
    },
    {
        path: '/home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/app/Index.vue'),
        redirect: '/home/gallery',
        children: [
            {
                path: '/home/gallery',
                component: () => import(/* webpackChunkName: "feed" */ '@/views/app/ImageFeed.vue'),
            },
            {
                path: '/home/my-images',
                component: () => import(/* webpackChunkName: "my-images" */ '@/views/app/UserGallery.vue'),
            },
            {
                path: '/home/upload',
                component: () => import(/* webpackChunkName: "uploadForm" */ '@/components/UploadForm.vue')
            },
            {
                path: "/:catchAll(.*)",
                redirect: '/home'
            }
        ]
    },
    
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router