<script setup lang="ts">
    import { useAuthStore } from '@/stores/auth'

    const authStore = useAuthStore()

    const logout = async () => {
        await authStore.logout()
    }
</script>

<template>
    <div>
        <button @click="logout">Log out</button>
    </div>
</template>
