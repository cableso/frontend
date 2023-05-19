<script setup lang="ts">
    import axiosClient from '@/utils/axios'
    import { onMounted, ref } from 'vue'
    import { useAuthStore } from '@/stores/auth'

    const authStore = useAuthStore()
    const visible = ref<boolean>(false)
    const loading = ref<boolean>(false)
    const emailSent = ref<boolean>(false)

    onMounted(() => {
        setTimeout(() => {
            visible.value = true
        }, 500)
    })

    const resendEmail = async () => {
        if (emailSent.value) return

        loading.value = true
        const response = await axiosClient.post('/auth/verifyEmail')

        if (response.status === 200) {
            emailSent.value = true
        }

        loading.value = false
    }
</script>

<template>
    <div>
        <transition
            enter-active-class="transition-all duration-200"
            enter-from-class="-translate-y-6"
            enter-to-class="translate-y-0"
            leave-active-class="transition-all duration-200"
            leave-from-class="translate-y-0"
            leave-to-class="-translate-y-6"
        >
            <div
                v-if="
                    visible && authStore.user && !authStore.user.emailVerifiedAt
                "
                class="flex items-center w-full h-12 px-6 shadow-2xl bg-neutral-900"
            >
                <svg
                    class="w-6 h-6 mr-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M4.75 6.75C4.75 5.64543 5.64543 4.75 6.75 4.75H17.25C18.3546 4.75 19.25 5.64543 19.25 6.75V14.25C19.25 15.3546 18.3546 16.25 17.25 16.25H14.625L12 19.25L9.375 16.25H6.75C5.64543 16.25 4.75 15.3546 4.75 14.25V6.75Z"
                    ></path>
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8V10"
                    ></path>
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12.5 13C12.5 13.2761 12.2761 13.5 12 13.5C11.7239 13.5 11.5 13.2761 11.5 13C11.5 12.7239 11.7239 12.5 12 12.5C12.2761 12.5 12.5 12.7239 12.5 13Z"
                    ></path>
                </svg>

                <p class="w-full text-sm text-white">
                    Please verify your email address by clicking the link sent
                    to
                    <strong>{{ authStore.user.email }}</strong>
                </p>

                <button
                    @click="resendEmail()"
                    class="flex items-center justify-center py-1 text-sm text-white transition-all border rounded-md hover:bg-white hover:bg-opacity-5 w-44 border-neutral-500 hover:border-white active:scale-95"
                >
                    <div
                        v-if="loading"
                        class="mr-4 sk-circle"
                    >
                        <div class="sk-circle1 sk-child"></div>
                        <div class="sk-circle2 sk-child"></div>
                        <div class="sk-circle3 sk-child"></div>
                        <div class="sk-circle4 sk-child"></div>
                        <div class="sk-circle5 sk-child"></div>
                        <div class="sk-circle6 sk-child"></div>
                        <div class="sk-circle7 sk-child"></div>
                        <div class="sk-circle8 sk-child"></div>
                        <div class="sk-circle9 sk-child"></div>
                        <div class="sk-circle10 sk-child"></div>
                        <div class="sk-circle11 sk-child"></div>
                        <div class="sk-circle12 sk-child"></div>
                    </div>

                    <span v-if="!emailSent"> Re-send Email </span>
                    <span v-else>Email sent!</span>
                </button>
            </div>
        </transition>
    </div>
</template>
