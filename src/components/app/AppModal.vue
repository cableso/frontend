<script setup lang="ts">
    import { ref } from 'vue'

    const props = defineProps({
        closable: Boolean
    })

    const visible = ref(true)

    const handleClickOutside = () => {
        if (props.closable) {
            visible.value = false
        }
    }
</script>

<template>
    <transition
        enter-active-class="transition-all duration-200 ease"
        enter-from-class="scale-0 opacity-0 -translate-y-96"
        enter-to-class="scale-100 opacity-100 -translate-y-0"
        leave-active-class="transition-all duration-200 ease"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
        <div
            v-if="visible"
            @click.self="handleClickOutside"
            class="fixed top-0 left-0 z-50 w-screen h-screen bg-black bg-opacity-60 backdrop-blur"
        >
            <div
                class="absolute flex flex-col p-4 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg left-1/2 top-1/2 drop-shadow-lg shadow-soft"
            >
                <slot />
            </div>
        </div>
    </transition>
</template>
