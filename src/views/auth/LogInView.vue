<script setup lang="ts">
    import AppLogo from '@/components/app/AppLogo.vue'
    import FormInput from '@/components/form/FormInput.vue'

    import { ref } from 'vue'
    import { useHead } from 'unhead'
    import { useForm } from 'vee-validate'
    import { object, string } from 'yup'
    import { useAuthStore } from '@/stores/auth'

    useHead({
        title: 'cable · Log in'
    })

    const schema = object({
        email: string().required('Email is required').email('Invalid Email'),
        password: string().required('Password is required')
    })

    const { errors, useFieldModel, handleSubmit } = useForm({
        validationSchema: schema
    })

    const email = useFieldModel('email')
    const password = useFieldModel('password')

    const authStore = useAuthStore()

    const error = ref<string>('')
    const loading = ref<boolean>(false)

    const submit = handleSubmit(async values => {
        loading.value = true
        error.value = await authStore.login({
            email: values.email,
            password: values.password
        })
        loading.value = false
    })
</script>

<template>
    <main
        class="flex flex-col w-screen h-screen overflow-hidden bg-neutral-50 md:flex-row"
    >
        <div
            class="flex items-center justify-center w-full h-1/3 md:w-1/2 md:h-full"
        >
            <div class="relative z-10 p-12 bg-neutral-50">
                <AppLogo />
            </div>

            <div
                class="w-full h-0.5 md:h-full md:w-0.5 bg-gradient-to-r md:bg-gradient-to-b from-transparent via-neutral-950 to-transparent absolute rounded opacity-30"
            />
        </div>

        <div
            class="flex flex-col items-center w-full h-full md:flex-row md:justify-center"
        >
            <div
                class="w-full max-w-sm px-10 py-5 bg-white rounded-lg shadow-soft"
            >
                <h1 class="text-2xl font-semibold tracking-tight">Log in</h1>
                <p class="mt-1 opacity-70">
                    New to cable?
                    <router-link
                        class="text-black transition opacity-70 hover:opacity-100"
                        to="/sign-up"
                    >
                        Create account
                    </router-link>
                </p>

                <form
                    @submit="submit"
                    class="flex flex-col mt-6 space-y-4"
                >
                    <FormInput
                        id="email"
                        v-model="email"
                        placeholder="john.doe@company.com"
                        :maxlength="255"
                        :minlength="3"
                        type="email"
                        label="Email address"
                        :valid="
                            email !== undefined && errors.email === undefined
                        "
                    >
                        <template #icon>
                            <svg
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="1.5"
                                    d="M4.75 7.75C4.75 6.64543 5.64543 5.75 6.75 5.75H17.25C18.3546 5.75 19.25 6.64543 19.25 7.75V16.25C19.25 17.3546 18.3546 18.25 17.25 18.25H6.75C5.64543 18.25 4.75 17.3546 4.75 16.25V7.75Z"
                                ></path>
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="1.5"
                                    d="M5.5 6.5L12 12.25L18.5 6.5"
                                ></path>
                            </svg>
                        </template>

                        <template #error>
                            {{ errors.email }}
                        </template>
                    </FormInput>

                    <FormInput
                        id="password"
                        v-model="password"
                        placeholder="****************"
                        :maxlength="255"
                        :minlength="8"
                        type="password"
                        label="Password"
                        :valid="
                            password !== undefined &&
                            errors.password === undefined
                        "
                    >
                        <template #icon>
                            <svg
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="1.5"
                                    d="M15 13.25C17.3472 13.25 19.25 11.3472 19.25 9C19.25 6.65279 17.3472 4.75 15 4.75C12.6528 4.75 10.75 6.65279 10.75 9C10.75 9.31012 10.7832 9.61248 10.8463 9.90372L4.75 16V19.25H8L8.75 18.5V16.75H10.5L11.75 15.5V13.75H13.5L14.0963 13.1537C14.3875 13.2168 14.6899 13.25 15 13.25Z"
                                ></path>
                                <path
                                    stroke="currentColor"
                                    d="M16.5 8C16.5 8.27614 16.2761 8.5 16 8.5C15.7239 8.5 15.5 8.27614 15.5 8C15.5 7.72386 15.7239 7.5 16 7.5C16.2761 7.5 16.5 7.72386 16.5 8Z"
                                ></path>
                            </svg>
                        </template>

                        <template #error>
                            {{ errors.password }}
                        </template>
                    </FormInput>

                    <span
                        v-if="error"
                        class="text-xs text-red-600"
                    >
                        {{ error }}
                    </span>

                    <div class="pt-4">
                        <button
                            type="submit"
                            class="flex items-center justify-center w-full py-2 text-sm transition-all bg-black rounded-md text-neutral-50 hover:bg-neutral-800 active:scale-95"
                        >
                            <div
                                v-if="loading"
                                class="mr-4 sk-circle"
                            >
                                <div class="sk-circle1 sk-child"></div>
                                <div class="sk-circle2 sk-child"></div>
                                <div class="sk-circle3 sk-child"></div>
                                <div class="sk-circle4 sk-child"></div>
                                <div class="sk-circle5 sk-child"></div>
                                <div class="sk-circle6 sk-child"></div>
                                <div class="sk-circle7 sk-child"></div>
                                <div class="sk-circle8 sk-child"></div>
                                <div class="sk-circle9 sk-child"></div>
                                <div class="sk-circle10 sk-child"></div>
                                <div class="sk-circle11 sk-child"></div>
                                <div class="sk-circle12 sk-child"></div>
                            </div>

                            Log in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </main>
</template>
