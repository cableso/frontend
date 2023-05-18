<script setup lang="ts">
    import { onMounted, ref } from 'vue'
    import { useRoute } from 'vue-router'
    import { useAuthStore } from '@/stores/auth'
    import AppLogo from '@/components/app/AppLogo.vue'
    import AppConfirmation from '@/components/app/AppConfirmation.vue'
    import AppPopup from '@/components/app/AppPopup.vue'

    import type Project from '@/types/Project'

    const route = useRoute()

    const activeEffect = ref()
    const hoverEffect = ref()
    const currentProject = ref<Project>()
    const projectSelectorOpen = ref<boolean>(false)
    const logoutConfirmationOpen = ref<boolean>(false)

    const authStore = useAuthStore()

    onMounted(() => {
        // Align navigation line
        document.querySelectorAll('a').forEach(element => {
            if (route.name === element.innerHTML.toLowerCase()) {
                const bodyRect = document.body.getBoundingClientRect()
                const elemRect = element.getBoundingClientRect()
                const offset = elemRect.top - bodyRect.top

                activeEffect.value.style.top = `${offset - 80}px`
            }
        })

        if (authStore.user?.projects) {
            currentProject.value =
                authStore.user.projects[authStore.currentProject]
        }
    })

    const handleMouseOver = (event: MouseEvent) => {
        const bodyRect = document.body.getBoundingClientRect()
        const elemRect = (event.target as HTMLElement)?.getBoundingClientRect()
        const offset = elemRect.top - bodyRect.top

        hoverEffect.value.style.top = `${offset - 140}px`
        hoverEffect.value.style.opacity = 1
    }

    const handleMouseLeave = () => {
        hoverEffect.value.style.opacity = 0
    }

    const handleClick = () => {
        activeEffect.value.style.top = hoverEffect.value.style.top
    }

    const selectProject = (index: number) => {
        authStore.setCurrentProject(index)
        projectSelectorOpen.value = false

        if (authStore.user?.projects) {
            currentProject.value =
                authStore.user.projects[authStore.currentProject]
        }
    }

    const handleClickLogout = () => {
        logoutConfirmationOpen.value = true
    }

    const tabs = [
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
    <nav
        class="relative z-40 flex flex-col items-center h-full bg-white w-44 shadow-soft"
    >
        <AppLogo class="h-8 mt-6" />

        <!-- Project Selector -->
        <AppPopup
            v-model="projectSelectorOpen"
            v-if="currentProject"
        >
            <template #trigger>
                <img
                    :src="
                        'https://ui-avatars.com/api/?name=' +
                        currentProject.name.replace(' ', '+')
                    "
                    class="w-5 h-5 mr-2 rounded-full"
                    alt="project avatar"
                />

                <p class="text-xs truncate max-w-[57%]">
                    {{ currentProject.name }}
                </p>

                <svg
                    class="w-5 h-5 ml-auto transition-all duration-200"
                    :class="projectSelectorOpen ? '' : '-rotate-90'"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M15.25 10.75L12 14.25L8.75 10.75"
                    ></path>
                </svg>
            </template>

            <template #content>
                <div
                    class="w-[90%]"
                    v-for="(project, index) in authStore.user?.projects"
                    :key="project.id"
                >
                    <button
                        v-if="index !== authStore.currentProject"
                        @click="selectProject(index)"
                        class="relative z-40 flex items-center w-full p-2 my-1 transition rounded-md hover:bg-black hover:bg-opacity-5 shadow-soft hover:shadow-hard"
                    >
                        <img
                            :src="
                                'https://ui-avatars.com/api/?name=' +
                                project.name.replace(' ', '+')
                            "
                            class="w-5 h-5 mr-2 rounded-full"
                            alt="project avatar"
                        />

                        <p class="text-xs truncate max-w-[80%]">
                            {{ project.name }}
                        </p>
                    </button>
                </div>
            </template>
        </AppPopup>

        <!-- Navigation Links -->
        <div class="relative flex flex-col w-full px-4 mt-6">
            <RouterLink
                v-for="tab in tabs"
                :key="tab.value"
                @mouseover="handleMouseOver"
                @click="handleClick"
                @mouseleave="handleMouseLeave"
                :to="tab.value"
                :class="[
                    'transition p-1.5 relative',
                    tab.value === route.path
                        ? 'font-medium cursor-default pointer-events-none'
                        : 'opacity-60'
                ]"
            >
                {{ tab.title }}
            </RouterLink>

            <div
                ref="hoverEffect"
                class="absolute w-[80%] opacity-0 bg-black bg-opacity-5 rounded-md h-9 pointer-events-none transition-all duration-300"
            />

            <div
                ref="activeEffect"
                class="h-4 w-0.5 bg-black absolute right-0 transition-all duration-300 rounded mt-2.5"
            />
        </div>

        <!-- Logout -->
        <div class="flex items-center justify-between mt-auto mb-6">
            <button
                @click="handleClickLogout"
                class="flex items-center justify-center w-8 h-8 p-1 transition rounded-full shadow-soft hover:bg-black hover:bg-opacity-5 hover:shadow-hard"
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M5.75 4.75L13.25 7.82143V19.25L5.75 16.1786V4.75ZM5.75 4.75L17.2557 4.81575C17.8058 4.81889 18.25 5.26568 18.25 5.81573V16.25C18.25 16.8023 17.8023 17.25 17.25 17.25H13.25"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                </svg>
            </button>
        </div>

        <AppConfirmation
            v-model="logoutConfirmationOpen"
            @confirm="authStore.logout"
        >
            <template #title> Confirm logout</template>
            <template #description>
                Are you sure you want to log out of your current session?
            </template>
        </AppConfirmation>
    </nav>
</template>
