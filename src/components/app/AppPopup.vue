<script setup lang="ts">
    const modelValue = defineModel()
</script>

<template>
    <div class="relative w-[130px] mt-6">
        <button
            @click="() => (modelValue = !modelValue)"
            class="relative z-40 flex items-center w-full p-2 transition rounded-md hover:bg-black hover:bg-opacity-5 shadow-soft hover:shadow-hard"
        >
            <slot name="trigger" />
        </button>

        <transition
            enter-active-class="transition-all duration-200"
            enter-from-class="scale-75 -translate-y-8 opacity-0"
            enter-to-class="scale-100 translate-y-0 opacity-100"
            leave-active-class="transition-all duration-200"
            leave-from-class="scale-100 translate-y-0 opacity-100"
            leave-to-class="scale-75 -translate-y-8 opacity-0"
        >
            <div
                v-if="modelValue"
                class="absolute z-30 min-w-full max-w-[14rem] transition-all py-2 mt-2 flex items-center justify-center flex-col bg-white rounded-md drop-shadow-xl bg-opacity-80 backdrop-blur shadow-soft"
            >
                <slot name="content" />
            </div>
        </transition>

        <div
            v-if="modelValue"
            @click.self="() => (modelValue = false)"
            class="fixed top-0 left-0 w-screen h-screen"
        />
    </div>
</template>
