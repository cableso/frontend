import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

import axiosClient from '@/axios'

import type User from '@/types/User'

export const useAuthStore = defineStore(
    'auth',
    () => {
        const user = ref<User | null>(null)
        const router = useRouter()

        const setUser = (updatedUser: User | null) => {
            user.value = updatedUser
        }

        const isAuthenticated = (): boolean => {
            return user.value !== null
        }

        const register = async ({
            email,
            password,
            passwordConfirmation
        }: {
            email: string
            password: string
            passwordConfirmation: string
        }): Promise<string> => {
            const error: string = ''

            await axiosClient.get('/sanctum/csrf-cookie')
            const response = await axiosClient.post('/auth/register', {
                email: email,
                password: password,
                password_confirmation: passwordConfirmation
            })

            if (response.data) {
                setUser({
                    id: response.data.id,
                    email: response.data.email
                })

                router.push('/conversations')
            }

            return error
        }

        const login = async ({
            email,
            password
        }: {
            email: string
            password: string
        }): Promise<string> => {
            let error = ''

            await axiosClient.get('/sanctum/csrf-cookie').then(async () => {
                await axiosClient
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
                    .catch(response => {
                        error = response.response.data.error
                    })
            })

            return error
        }

        const logout = async (): Promise<string> => {
            await axiosClient.get('/sanctum/csrf-cookie')
            await axiosClient.post('/auth/logout')

            setUser(null)

            router.push('/login')

            return ''
        }

        return { user, setUser, isAuthenticated, register, login, logout }
    },
    {
        persist: true
    }
)
