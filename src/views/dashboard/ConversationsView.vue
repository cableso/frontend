<script setup lang="ts">
    import { useAuthStore } from '@/stores/auth'

    const authStore = useAuthStore()

    const logout = () => {
        authStore.logout()
    }
</script>

<template>
    <div>
        Conversations! yey

        <button @click="logout">Log out</button>
    </div>
</template>
