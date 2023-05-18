<script setup lang="ts">
    import AppModal from './AppModal.vue'

    const modelValue = defineModel()

    const emit = defineEmits(['confirm'])
</script>

<template>
    <AppModal
        v-model="modelValue"
        :closable="true"
    >
        <div class="min-w-[15rem]">
            <h2 class="font-semibold">
                <slot name="title" />
            </h2>

            <p class="max-w-xs mt-2 text-sm opacity-50">
                <slot name="description" />
            </p>

            <hr class="absolute left-0 w-full mt-6 border-black opacity-20" />

            <div class="w-full pt-4 mt-6 space-x-2">
                <button
                    @click="() => emit('confirm')"
                    class="px-6 py-1.5 text-sm rounded-md bg-neutral-950 text-white hover:bg-neutral-900 transition active:scale-95"
                >
                    Log out
                </button>

                <button
                    @click="() => (modelValue = false)"
                    class="px-6 py-1.5 text-sm rounded-md shadow-soft hover:bg-black hover:bg-opacity-5 transition active:scale-95"
                >
                    Cancel
                </button>
            </div>
        </div>
    </AppModal>
</template>
