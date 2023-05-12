import { ref } from 'vue'
import { defineStore } from 'pinia'

import axiosClient from '@/axios'

import type User from '@/types/User'

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

                window.location.href = '/conversations'
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
                    .then(async response => {
                        if (response.data) {
                            setUser({
                                id: response.data.id,
                                email: response.data.email
                            })

                            window.location.href = '/conversations'
                        }
                    })
                    .catch(response => {
                        if (response.response) {
                            error = response.response.data.error
                        }
                    })
            })

            return error
        }

        const logout = async (): Promise<string> => {
            await axiosClient.get('/sanctum/csrf-cookie').then(async () => {
                await axiosClient.delete('/auth/logout')

                setUser(null)

                window.location.href = '/login'
            })

            return ''
        }

        return { user, setUser, isAuthenticated, register, login, logout }
    },
    {
        persist: true
    }
)
