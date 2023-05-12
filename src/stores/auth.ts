import { ref } from 'vue'
import { defineStore } from 'pinia'

import axiosClient from '@/axios'
import router from '@/router'

interface User {
    id: number
    email: string
}

export const useAuthStore = defineStore(
    'auth',
    () => {
        const user = ref<User | null>(null)

        const setUser = (updatedUser: User | null) => {
            user.value = updatedUser
        }

        const isAuthenticated = (): boolean => {
            return user.value !== null
        }

        const logout = () => {
            axiosClient.get('/sanctum/csrf-cookie').then(() => {
                axiosClient.post('/auth/logout')
            })

            setUser(null)

            router.push('/login')
        }

        return { user, setUser, isAuthenticated, logout }
    },
    {
        persist: true
    }
)
