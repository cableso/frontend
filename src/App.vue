<script setup lang="ts">
    import { RouterView } from 'vue-router'
    import { useAuthStore } from './stores/auth'
    import { ref } from 'vue'

    import CreateProjectModal from '@/modals/CreateProjectModal.vue'

    const authStore = useAuthStore()

    const createProjectOpen = ref<boolean>(true)
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

            <CreateProjectModal
                v-if="authStore.user && authStore.user.projects?.length === 0"
                v-model="createProjectOpen"
                :closeable="false"
            />
        </main>
    </div>
</template>
