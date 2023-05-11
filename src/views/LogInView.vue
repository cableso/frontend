<script setup lang="ts">
    import { ref } from 'vue'
    import AppLogo from '@/components/AppLogo.vue'
    import FormInput from '@/components/FormInput.vue'

    const formData = ref({
        email: '',
        password: '',
        password_confirmation: ''
    })
</script>

<template>
    <main class="bg-neutral-50 w-screen h-screen overflow-hidden flex">
        <div class="w-1/4 h-full flex items-center justify-center">
            <div class="p-12 bg-neutral-50 relative z-10">
                <AppLogo />
            </div>

            <div
                class="h-full w-0.5 bg-gradient-to-b from-transparent via-neutral-950 to-transparent absolute rounded"
            />
        </div>

        <div class="w-full h-full flex items-center justify-center">
            <div
                class="max-w-sm w-full bg-white px-10 py-5 shadow-soft rounded-lg"
            >
                <h1 class="text-2xl font-semibold tracking-tight">Log in</h1>
                <p class="mt-1 opacity-70">
                    Don't have an account?
                    <router-link
                        class="text-black opacity-70 hover:opacity-100 transition"
                        to="/sign-up"
                    >
                        Sign up
                    </router-link>
                </p>

                <form class="flex flex-col space-y-4 mt-6">
                    <FormInput
                        id="email"
                        v-model="formData.email"
                        placeholder="john.doe@company.com"
                        :maxlength="255"
                        :minlength="3"
                        type="email"
                        label="Email address"
                    />

                    <FormInput
                        id="password"
                        v-model="formData.password"
                        placeholder="****************"
                        :maxlength="255"
                        :minlength="6"
                        type="password"
                        label="Password"
                    />

                    <FormInput
                        id="password_confirmation"
                        v-model="formData.password_confirmation"
                        placeholder="****************"
                        :maxlength="255"
                        :minlength="6"
                        type="password"
                        label="Confirm Password"
                    />
                </form>
            </div>
        </div>
    </main>
</template>
