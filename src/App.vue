<script setup lang="ts">
    import { RouterView, useRoute } from 'vue-router'
    import { useAuthStore } from '@/stores/auth'
    import { ref } from 'vue'

    import CreateProjectModal from '@/modals/CreateProjectModal.vue'
    import VerifyEmailBanner from '@/components/banner/VerifyEmailBanner.vue'

    const authStore = useAuthStore()
    const route = useRoute()

    const createProjectOpen = ref<boolean>(true)
</script>

<template>
    <div class="flex flex-col w-screen h-screen overflow-hidden bg-light-2">
        <VerifyEmailBanner v-if="authStore.user" />

        <div class="flex w-full h-full">
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
                    v-if="
                        route.name !== 'verifyEmail' &&
                        authStore.user &&
                        authStore.user.projects?.length === 0
                    "
                    v-model="createProjectOpen"
                    :closeable="false"
                >
                    <div class="pt-2">
                        <div class="relative">
                            <p
                                class="absolute px-4 text-xs text-center -translate-x-1/2 -translate-y-1/2 bg-white top-1/2 left-1/2"
                            >
                                or
                            </p>
                            <hr />
                        </div>

                        <button
                            @click="authStore.logout()"
                            class="flex items-center justify-center w-full py-2 mt-6 text-sm transition-all rounded-md shadow-soft hover:bg-black hover:bg-opacity-5 hover:shadow-hard active:scale-95"
                        >
                            Log out
                        </button>
                    </div>
                </CreateProjectModal>
            </main>
        </div>
    </div>
</template>
