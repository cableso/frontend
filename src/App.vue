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
