import { ref } from 'vue'
import { defineStore } from 'pinia'

import axiosClient from '@/axios'
import type User from '@/types/User'

const HOME_PATH = '/inbox'

export const useAuthStore = defineStore(
    'auth',
    () => {
        const user = ref<User | null>(null)

        const setUser = (updatedUser: User | null) => {
            user.value = updatedUser
        }

        const isAuthenticated = async (): Promise<boolean> => {
            await axiosClient.get('/sanctum/csrf-cookie')

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
            let error: string = ''

            await axiosClient.get('/sanctum/csrf-cookie')
            const response = await axiosClient
                .post('/auth/register', {
                    email: email,
                    password: password,
                    password_confirmation: passwordConfirmation
                })
                .catch(err => {
                    if (err.response) {
                        error = err.response.data.error
                    }
                })

            if (response) {
                setUser({
                    id: response.data.id,
                    email: response.data.email
                })

                window.location.href = HOME_PATH
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

            await axiosClient.get('/sanctum/csrf-cookie')
            const response = await axiosClient
                .post('/auth/login', {
                    email: email,
                    password: password
                })
                .catch(err => {
                    if (err.response) {
                        error = err.response.data.error
                    }
                })

            if (response) {
                setUser({
                    id: response.data.id,
                    email: response.data.email
                })

                window.location.href = HOME_PATH
            }

            return error
        }

        const logout = async (): Promise<string> => {
            await axiosClient.delete('/auth/logout').catch(() => {})

            setUser(null)

            window.location.href = '/login'

            return ''
        }

        return { user, setUser, isAuthenticated, register, login, logout }
    },
    { persist: true }
)
