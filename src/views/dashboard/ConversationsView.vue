<script setup lang="ts">
    import { useAuthStore } from '@/stores/auth'
    import { useHead } from 'unhead'

    useHead({
        title: 'cable · Conversations'
    })

    const authStore = useAuthStore()

    const logout = async () => {
        await authStore.logout()
    }
</script>

<template>
    <div class="flex flex-col w-full h-full">
        <div class="relative z-10 w-full h-20 p-6 bg-light-1 shadow-soft">
            <h1 class="text-2xl font-semibold tracking-tight">Conversations</h1>
        </div>

        <div class="flex w-full h-full">
            <div class="relative flex flex-col p-6 w-52 bg-light-1 shadow-soft">
                <!-- <button
                    @click="logout"
                    class="p-4 text-white bg-black rounded-full"
                >
                    log out!
                </button> -->
            </div>
        </div>
    </div>
</template>
