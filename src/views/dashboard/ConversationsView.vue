<script setup lang="ts">
    import DashboardLayout from '@/layouts/DashboardLayout.vue'

    import { useAuthStore } from '@/stores/auth'

    const authStore = useAuthStore()

    const logout = async () => {
        await authStore.logout()
    }
</script>

<template>
    <DashboardLayout>
        <div>
            <button @click="logout">Log out</button>

            <RouterLink to="/inbox">TO INBOX</RouterLink>
        </div>
    </DashboardLayout>
</template>
