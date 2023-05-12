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

        const register = ({
            email,
            password,
            passwordConfirmation
        }: {
            email: string
            password: string
            passwordConfirmation: string
        }) => {
            axiosClient.get('/sanctum/csrf-cookie').then(() => {
                axiosClient
                    .post('/auth/register', {
                        email: email,
                        password: password,
                        password_confirmation: passwordConfirmation
                    })
                    .then(response => {
                        if (response.data) {
                            setUser({
                                id: response.data.id,
                                email: response.data.email
                            })

                            router.push('/conversations')
                        }
                    })
            })
        }

        const login = ({
            email,
            password
        }: {
            email: string
            password: string
        }) => {
            axiosClient.get('/sanctum/csrf-cookie').then(() => {
                axiosClient
                    .post('/auth/login', {
                        email: email,
                        password: password
                    })
                    .then(response => {
                        if (response.data) {
                            setUser({
                                id: response.data.id,
                                email: response.data.email
                            })

                            router.push('/conversations')
                        }
                    })
            })
        }

        const logout = () => {
            axiosClient.get('/sanctum/csrf-cookie').then(() => {
                axiosClient.post('/auth/logout')
            })

            setUser(null)

            router.push('/login')
        }

        return { user, setUser, isAuthenticated, register, login, logout }
    },
    {
        persist: true
    }
)
