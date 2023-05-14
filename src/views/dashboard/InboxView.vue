<script setup lang="ts">
    import DashboardLayout from '@/layouts/DashboardLayout.vue'

    import { useHead } from 'unhead'

    useHead({
        title: 'cable · Inbox'
    })
</script>

<template>
    <DashboardLayout>
        <div class="w-full h-20 p-6 bg-light-1 shadow-soft">
            <h1 class="text-2xl font-semibold tracking-tight">Inbox</h1>
        </div>
    </DashboardLayout>
</template>
