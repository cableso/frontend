import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import SignUpView from '@/views/auth/SignUpView.vue'
import LogInView from '@/views/auth/LogInView.vue'
import InboxView from '@/views/dashboard/InboxView.vue'
import ConversationsView from '@/views/dashboard/ConversationsView.vue'
import AppNav from '@/components/AppNav.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            redirect: '/conversations'
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
        },
        {
            path: '/inbox',
            name: 'inbox',
            components: {
                default: InboxView,
                navigation: AppNav
            }
        },
        {
            path: '/conversations',
            name: 'conversations',
            components: {
                default: ConversationsView,
                navigation: AppNav
            }
        }
    ]
})

router.beforeEach(async to => {
    const authStore = useAuthStore()
    const isAuthenticated = await authStore.isAuthenticated()

    if (!isAuthenticated && to.path !== '/sign-up' && to.path !== '/login') {
        router.push('/login')
    }

    if (isAuthenticated && (to.path === '/sign-up' || to.path === '/login')) {
        router.push('/conversations')
    }
})

export default router
