import { ref } from 'vue'
import { defineStore } from 'pinia'

import axiosClient from '@/utils/axios'
import type User from '@/types/User'
import type Project from '@/types/Project'

const HOME_PATH = '/inbox'

export const useAuthStore = defineStore(
    'auth',
    () => {
        const user = ref<User | null>(null)
        const currentProject = ref<number>(0)

        const setUser = (updatedUser: User | null) => {
            user.value = updatedUser
        }

        const refresh = async () => {
            if (await isAuthenticated()) {
                const response = await axiosClient.get('/api/user')

                if (response) {
                    setUser({
                        id: response.data.id,
                        email: response.data.email,
                        projects: response.data.projects,
                        emailVerifiedAt: response.data.emailVerifiedAt
                    })
                }
            }
        }

        const setEmailVerifiedAt = (emailVerifiedAt: Date) => {
            if (user.value) {
                setUser({
                    id: user.value.id,
                    email: user.value.email,
                    projects: user.value.projects,
                    emailVerifiedAt: emailVerifiedAt
                })
            }
        }

        /* Projects */
        const setCurrentProject = (updatedCurrentProject: number) => {
            currentProject.value = updatedCurrentProject
        }

        const addProject = (project: Project) => {
            user.value?.projects?.push(project)
        }

        /* Auth */
        const isAuthenticated = async (): Promise<boolean> => {
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
                    email: response.data.email,
                    projects: response.data.projects,
                    emailVerifiedAt: response.data.emailVerifiedAt
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

        return {
            user,
            refresh,

            setEmailVerifiedAt,

            currentProject,
            setCurrentProject,
            addProject,

            isAuthenticated,

            register,
            login,
            logout
        }
    },
    { persist: true }
)
