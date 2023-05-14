import { ref } from 'vue'
import { defineStore } from 'pinia'

import axiosClient from '@/axios'

import type User from '@/types/User'

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)

    const setUser = (updatedUser: User | null) => {
        user.value = updatedUser
    }

    const isAuthenticated = async (): Promise<boolean> => {
        await axiosClient
            .get('/api/user')
            .then(response => {
                setUser({
                    id: response.data.id,
                    email: response.data.email
                })
            })
            .catch(error => {
                if (error.response.data.message === 'Unauthenticated.') {
                    setUser(null)
                }
            })

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

        await axiosClient.get('/sanctum/csrf-cookie').then(async () => {
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
        })

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
        await axiosClient
            .post('/auth/login', {
                email: email,
                password: password
            })
            .catch(response => {
                if (response.response) {
                    error = response.response.data.error
                }
            })

        if (!error) {
            window.location.href = '/conversations'
        }

        return error
    }

    const logout = async (): Promise<string> => {
        await axiosClient.delete('/auth/logout')

        setUser(null)

        window.location.href = '/login'

        return ''
    }

    return { user, setUser, isAuthenticated, register, login, logout }
})
