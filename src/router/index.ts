import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import SignUpView from '../views/SignUpView.vue'
import LogInView from '../views/LogInView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            redirect: '/sign-up'
        },
        {
            path: '/sign-up',
            name: 'signup',
            component: SignUpView
        },
        {
            path: '/login',
            name: 'login',
            component: LogInView
        }
    ]
})

router.beforeEach(async (to, from) => {
    const authStore = useAuthStore()
    const isAuthenticated = authStore.isAuthenticated()

    console.log(isAuthenticated)
})

export default router
