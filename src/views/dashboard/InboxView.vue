<script setup lang="ts">
    import DashboardLayout from '@/layouts/DashboardLayout.vue'

    import { RouterLink } from 'vue-router'
</script>

<template>
    <DashboardLayout>
        <div>
            <RouterLink to="/conversations">To Conversations</RouterLink>
        </div>
    </DashboardLayout>
</template>
