<script setup lang="ts">
    import { ref, onMounted } from 'vue'

    defineProps({
        id: String,
        label: String,
        placeholder: String,
        minlength: {
            type: Number,
            default: 1
        },
        maxlength: {
            type: Number,
            default: 255
        },
        type: {
            type: String,
            default: 'text'
        },
        autofocus: Boolean,
        disabled: Boolean,
        valid: Boolean
    })

    const input = ref<HTMLInputElement>()
    const modelValue = defineModel()

    onMounted(() => {
        if (input.value && input.value.hasAttribute('autofocus')) {
            input.value.focus()
        }
    })

    defineEmits(['blur', 'input', 'keypress'])

    defineExpose({
        focus: () => {
            if (input.value) input.value.focus()
        }
    })
</script>

<template>
    <div class="relative w-full transition bg-white rounded-md shadow-soft">
        <input
            :id="id"
            ref="input"
            v-model="modelValue"
            :placeholder="placeholder"
            :maxlength="maxlength"
            :minlength="minlength"
            class="w-full py-2 pl-3 font-medium text-black placeholder-opacity-0 transition bg-transparent border-none rounded-md floating-label pr-14 placeholder-neutral-400 focus-within:placeholder-opacity-100 focus:outline-none focus:ring-0 disabled:opacity-50"
            :type="type"
            :name="id"
            :value="modelValue"
            :autofocus="autofocus"
            :disabled="disabled"
            @input="(event: any) => $emit('input', event)"
            @blur="$emit('blur')"
            @keypress="event => $emit('keypress', event)"
        />
        <label
            :for="id"
            class="absolute px-1.5 text-sm font-medium text-black transition -translate-y-1/2 pointer-events-none select-none top-1/2 left-4"
        >
            {{ label }}
        </label>
        <div
            class="absolute px-3 -translate-y-1/2 right-3 top-1/2"
            :class="valid ? 'opacity-100' : 'opacity-50'"
        >
            <slot name="icon" />
        </div>

        <span class="absolute text-xs text-red-600 right-2 -top-4">
            <slot name="error" />
        </span>
    </div>
</template>
