<script setup lang="ts">
    import AppLogo from '@/components/app/AppLogo.vue'
    import axiosClient from '@/utils/axios'

    import { useHead } from 'unhead'
    import { onMounted } from 'vue'
    import { useRoute } from 'vue-router'
    import { useAuthStore } from '@/stores/auth'

    useHead({
        title: 'cable · Verify Email'
    })

    const authStore = useAuthStore()
    const route = useRoute()

    onMounted(async () => {
        if (!authStore.user) return
        if (authStore.user.emailVerifiedAt) return

        const response = await axiosClient.post(
            '/auth/verifyEmail',
            route.query
        )

        if (response.status === 200) {
            authStore.setEmailVerifiedAt(new Date())
        }
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
                <h1 class="text-2xl font-semibold tracking-tight">
                    🥳 Successfully verified!
                </h1>
                <p class="mt-1 mb-4 text-sm opacity-70">
                    Welcome to Cable - you're all set to revolutionize your
                    customer service experience. Let's get started!<br />
                </p>

                <router-link
                    class="mt-4 text-black transition opacity-70 hover:opacity-100"
                    to="/inbox"
                >
                    Visit Dashboard &rarr;
                </router-link>
            </div>
        </div>
    </main>
</template>
