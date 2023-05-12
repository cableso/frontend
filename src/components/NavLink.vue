<script setup lang="ts">
    import { useRoute } from 'vue-router'

    defineProps({
        to: String
    })

    const route = useRoute()
</script>

<template>
    <RouterLink
        :to="to + ''"
        class="transition p-1.5 relative"
        :class="
            to === route.path
                ? 'font-medium cursor-default pointer-events-none'
                : 'opacity-60 hover:bg-black hover:bg-opacity-5 rounded-md'
        "
    >
        <slot />

        <div
            v-if="to === route.path"
            class="h-1/2 w-0.5 bg-black absolute -right-4 top-1/2 -translate-y-1/2 rounded"
        />
    </RouterLink>
</template>
