<script setup lang="ts">
    import AppLogo from '@/components/AppLogo.vue'
    import NavLink from '@/components/NavLink.vue'
</script>

<template>
    <div class="w-screen h-screen overflow-hidden bg-neutral-50">
        <nav
            class="flex flex-col items-center w-40 h-full bg-white shadow-soft"
        >
            <AppLogo class="h-8 mt-6" />

            <div class="flex flex-col w-full px-4 mt-6">
                <NavLink to="/inbox">Inbox</NavLink>
                <NavLink to="/conversations">Conversations</NavLink>
            </div>
        </nav>

        <slot />
    </div>
</template>
