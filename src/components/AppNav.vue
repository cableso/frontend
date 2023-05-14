<script setup lang="ts">
    import { onMounted, ref } from 'vue'
    import { useRoute } from 'vue-router'
    import AppLogo from '@/components/AppLogo.vue'

    const route = useRoute()

    const activeEffect = ref()
    const hoverEffect = ref()

    onMounted(() => {
        document.querySelectorAll('a').forEach(element => {
            if (route.name === element.innerHTML.toLowerCase()) {
                const bodyRect = document.body.getBoundingClientRect()
                const elemRect = element.getBoundingClientRect()
                const offset = elemRect.top - bodyRect.top

                activeEffect.value.style.top = `${offset - 80}px`
            }
        })
    })

    const handleMouseOver = (event: MouseEvent) => {
        const bodyRect = document.body.getBoundingClientRect()
        const elemRect = (event.target as HTMLElement)?.getBoundingClientRect()
        const offset = elemRect.top - bodyRect.top

        hoverEffect.value.style.top = `${offset - 80}px`
        hoverEffect.value.style.opacity = 1
    }

    const handleMouseLeave = () => {
        hoverEffect.value.style.opacity = 0
    }

    const handleClick = () => {
        activeEffect.value.style.top = hoverEffect.value.style.top
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
