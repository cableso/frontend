<script setup lang="ts">
    import { onMounted, ref } from 'vue'
    import { useRoute } from 'vue-router'
    import { useAuthStore } from '@/stores/auth'
    import AppLogo from '@/components/app/AppLogo.vue'

    import type Project from '@/types/Project'

    const route = useRoute()

    const activeEffect = ref()
    const hoverEffect = ref()
    const projectSelectorOpen = ref<boolean>(false)
    const currentProject = ref<Project>()

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
        <div
            v-if="currentProject"
            class="relative w-[130px] mt-6"
        >
            <button
                @click="() => (projectSelectorOpen = !projectSelectorOpen)"
                class="relative z-40 flex items-center w-full p-2 transition rounded-md hover:bg-black hover:bg-opacity-5 shadow-soft hover:shadow-hard"
            >
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
            </button>

            <transition
                enter-active-class="transition-all duration-300"
                enter-from-class="scale-75 -translate-y-8 opacity-0"
                enter-to-class="scale-100 translate-y-0 opacity-100"
                leave-active-class="transition-all duration-200"
                leave-from-class="scale-100 translate-y-0 opacity-100"
                leave-to-class="scale-75 -translate-y-8 opacity-0"
            >
                <div
                    v-if="projectSelectorOpen"
                    class="absolute z-30 min-w-full max-w-[14rem] transition-all py-2 mt-2 flex items-center justify-center flex-col bg-white rounded-md drop-shadow-xl bg-opacity-80 backdrop-blur shadow-soft"
                >
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
                </div>
            </transition>
        </div>

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
    </nav>
</template>
