<script setup lang="ts">
    const props = defineProps({
        closable: Boolean
    })

    const modelValue = defineModel()

    const close = () => {
        if (props.closable) {
            modelValue.value = false
        }
    }
</script>

<template>
    <div
        class="fixed top-0 left-0 z-50 w-screen h-screen pointer-events-none select-none"
    >
        <transition
            enter-active-class="transition duration-200 ease"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition duration-200 ease"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div
                v-if="modelValue"
                @click.self="close"
                class="absolute top-0 left-0 z-10 w-full h-full bg-black pointer-events-auto bg-opacity-60 backdrop-blur"
            />
        </transition>

        <transition
            enter-active-class="transition-all duration-300 ease"
            enter-from-class="scale-0 -translate-y-20 opacity-0"
            enter-to-class="scale-100 opacity-100 -translate-y-0"
            leave-active-class="transition-all duration-300 ease"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div
                v-if="modelValue"
                :class="[
                    'absolute z-20 flex flex-col p-4 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg left-1/2 top-1/2 drop-shadow-lg shadow-soft pointer-events-auto',
                    closable ? 'pl-4 pr-16' : ''
                ]"
            >
                <slot />

                <button
                    v-if="closable"
                    @click="close"
                    class="absolute p-0.5 rounded-md top-4 right-4 hover:bg-black hover:bg-opacity-5 active:scale-90 transition"
                >
                    <svg
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            d="M17.25 6.75L6.75 17.25"
                        ></path>
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            d="M6.75 6.75L17.25 17.25"
                        ></path>
                    </svg>
                </button>
            </div>
        </transition>
    </div>
</template>
