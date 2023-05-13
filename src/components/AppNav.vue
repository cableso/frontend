<template>
    <div class="relative flex flex-col w-full px-4 mt-6">
        <RouterLink
            v-for="tab in tabs"
            :key="tab.value"
            @mouseover="handleMouseOver"
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

            <div
                v-if="tab.value === route.path"
                class="h-1/2 w-0.5 bg-black absolute -right-4 top-1/2 -translate-y-1/2 rounded"
            />
        </RouterLink>

        <div
            ref="hoverEffect"
            class="absolute w-[80%] opacity-0 bg-black bg-opacity-5 rounded-md h-9 pointer-events-none transition-all duration-300"
        />
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { useRoute } from 'vue-router'

    interface Tabs {
        title: string
        value: string
    }

    const route = useRoute()
    const hoverEffect = ref()

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

    defineProps<{ tabs: Tabs[] }>()
</script>
