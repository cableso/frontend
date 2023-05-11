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
        modelValue: String,
        value: String,
        valid: Boolean
    })

    defineEmits(['update:modelValue', 'blur', 'input', 'keypress'])

    const input = ref<HTMLInputElement>()
    onMounted(() => {
        if (input.value && input.value.hasAttribute('autofocus')) {
            input.value.focus()
        }
    })

    defineExpose({
        focus: () => {
            if (input.value) input.value.focus()
        }
    })
</script>

<template>
    <div class="relative w-full rounded-md shadow-soft bg-white transition">
        <input
            :id="id"
            ref="input"
            :placeholder="placeholder"
            :maxlength="maxlength"
            :minlength="minlength"
            class="floating-label w-full rounded-md border-none bg-transparent py-2 pl-3 pr-14 font-medium text-black placeholder-neutral-400 placeholder-opacity-0 transition focus-within:placeholder-opacity-100 focus:outline-none focus:ring-0 disabled:opacity-50"
            :type="type"
            :name="id"
            :value="modelValue ?? value"
            :autofocus="autofocus"
            :disabled="disabled"
            @input="
                (event: any) => {
                    $emit('update:modelValue', event.target ? event.target.value : null)
                    $emit('input', event)
                }
            "
            @blur="$emit('blur')"
            @keypress="event => $emit('keypress', event)"
        />
        <label
            :for="id"
            class="pointer-events-none absolute top-1/2 px-3 left-3 -translate-y-1/2 text-sm font-medium select-none text-black transition"
        >
            {{ label }}
        </label>
        <div
            class="absolute right-3 px-3 top-1/2 -translate-y-1/2"
            :class="valid ? 'opacity-100' : 'opacity-50'"
        >
            <slot name="icon" />
        </div>
    </div>
</template>
