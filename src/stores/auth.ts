import { ref } from 'vue'
import { defineStore } from 'pinia'

interface User {
    id: number
    email: string
}

export const useAuthStore = defineStore(
    'auth',
    () => {
        const user = ref<User | null>(null)

        const setUser = (updatedUser: User) => {
            user.value = updatedUser
        }

        const isAuthenticated = (): boolean => {
            return user.value !== null
        }

        return { user, setUser, isAuthenticated }
    },
    {
        persist: true
    }
)
