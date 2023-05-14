<script setup lang="ts">
    import { RouterView } from 'vue-router'
</script>

<template>
    <div class="flex w-screen h-screen overflow-hidden bg-light-2">
        <router-view name="navigation" />

        <main class="relative w-full h-full">
            <router-view v-slot="{ Component }">
                <transition
                    name="fade"
                    mode="out-in"
                >
                    <component :is="Component" />
                </transition>
            </router-view>
        </main>
    </div>
</template>

<style scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition: all 0.2s ease;
    }

    .fade-enter-from {
        opacity: 0;
        transform: translateY(-1rem);
    }

    .fade-enter-to {
        opacity: 1;
        transform: translateY(0);
    }

    .fade-leave-from {
        opacity: 1;
        transform: translateY(0);
    }

    .fade-leave-to {
        opacity: 0;
        transform: translateY(-1rem);
    }
</style>
