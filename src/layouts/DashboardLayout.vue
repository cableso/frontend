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
        },
        {
            title: 'Training',
            value: '/training'
        }
    ]
</script>

<template>
    <div class="w-screen h-screen overflow-hidden bg-neutral-50">
        <nav
            class="flex flex-col items-center w-40 h-full bg-white shadow-soft"
        >
            <AppLogo class="h-8 mt-6" />

            <AppNav :tabs="navigationTabs" />

            <!-- <div class="relative flex flex-col w-full px-4 mt-6">
                <NavLink to="/inbox">Inbox</NavLink>
                <NavLink to="/conversations">Conversations</NavLink>
                <NavLink to="/training">Training</NavLink>
                <NavLink to="/integrations">Integrations</NavLink>
                <NavLink to="/settings">Settings</NavLink>

                <div
                    class="absolute w-[80%] bg-black bg-opacity-10 rounded-md h-9"
                />
            </div> -->
        </nav>

        <slot />
    </div>
</template>
