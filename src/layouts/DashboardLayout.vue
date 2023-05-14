<script setup lang="ts">
    import AppLogo from '@/components/AppLogo.vue'
    import AppNav from '@/components/AppNav.vue'

    const navigationTabs = [
        {
            title: 'Inbox',
            value: '/inbox'
        },
        {
            title: 'Conversations',
            value: '/conversations'
        }
    ]
</script>

<template>
    <div class="flex w-screen h-screen overflow-hidden bg-light-2">
        <nav
            class="relative z-40 flex flex-col items-center h-full bg-white w-44 shadow-soft"
        >
            <AppLogo class="h-8 mt-6" />
            <AppNav :tabs="navigationTabs" />
        </nav>

        <main class="relative w-full h-full">
            <slot />
        </main>
    </div>
</template>
