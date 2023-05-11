<script setup lang="ts">
    import AppLogo from '@/components/AppLogo.vue'
    import FormInput from '@/components/FormInput.vue'

    import { useHead } from 'unhead'
    import { useForm } from 'vee-validate'
    import { object, string, ref } from 'yup'

    useHead({
        title: 'cable · Sign Up'
    })

    const schema = object({
        email: string().required('Email is required').email('Invalid Email'),
        password: string()
            .required('Password is required')
            .min(8, 'Minimum 8 Characters'),
        passwordConfirmation: string()
            .required('Confirmation is required')
            .oneOf([ref('password'), ''], 'Passwords must match')
            .min(8, 'Minimum 8 Characters')
    })

    const { errors, useFieldModel, handleSubmit } = useForm({
        validationSchema: schema
    })

    const email = useFieldModel('email')
    const password = useFieldModel('password')
    const passwordConfirmation = useFieldModel('passwordConfirmation')

    const submit = handleSubmit(values => {
        alert(JSON.stringify(values, null, 2))
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
                <h1 class="text-2xl font-semibold tracking-tight">Sign up</h1>
                <p class="mt-1 opacity-70">
                    Already have an account?
                    <router-link
                        class="text-black transition opacity-70 hover:opacity-100"
                        to="/login"
                    >
                        Log in
                    </router-link>
                </p>

                <form
                    @submit="submit"
                    class="flex flex-col mt-6 space-y-5"
                >
                    <FormInput
                        id="email"
                        v-model="email"
                        placeholder="john.doe@company.com"
                        :maxlength="255"
                        :minlength="3"
                        type="email"
                        label="Email address"
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

                    <FormInput
                        id="password_confirmation"
                        v-model="passwordConfirmation"
                        placeholder="****************"
                        :maxlength="255"
                        :minlength="8"
                        type="password"
                        label="Confirm Password"
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
                            {{ errors.passwordConfirmation }}
                        </template>
                    </FormInput>

                    <div class="pt-4">
                        <p class="text-xs opacity-70">
                            By creating an account, you agree to cable's
                            <a
                                class="text-black transition-all text-opacity-70 hover:text-opacity-100 hover:font-medium"
                                href="https://cable.so/terms-of-service"
                                target="_blank"
                                ref="noopener noreferrer"
                                >Terms</a
                            >
                            and
                            <a
                                class="text-black transition-all text-opacity-70 hover:text-opacity-100 hover:font-medium"
                                href="https://cable.so/privacy-policy"
                                target="_blank"
                                ref="noopener noreferrer"
                                >Privacy Policy</a
                            >.
                        </p>

                        <button
                            type="submit"
                            class="w-full py-2 mt-2 text-sm transition bg-black rounded-md text-neutral-50 hover:bg-neutral-800 active:scale-95"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </main>
</template>
