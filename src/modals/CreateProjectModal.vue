<script setup lang="ts">
    import AppModal from '@/components/app/AppModal.vue'
    import FormInput from '@/components/form/FormInput.vue'

    import { ref } from 'vue'
    import { useForm } from 'vee-validate'
    import { object, string } from 'yup'
    import axiosClient from '@/utils/axios'
    import { useAuthStore } from '@/stores/auth'

    defineProps({
        closeable: Boolean
    })

    const schema = object({
        name: string().required('Name is required'),
        url: string().required('Url is required').url('must be valid Url'),
        industry: string().required('Industry is required'),
        language: string().required('Language is required')
    })

    const { errors, useFieldModel, handleSubmit } = useForm({
        validationSchema: schema
    })

    const name = useFieldModel('name')
    const url = useFieldModel('url')
    const industry = useFieldModel('industry')
    const language = useFieldModel('language')

    const error = ref<string>('')
    const loading = ref<boolean>(false)

    const authStore = useAuthStore()

    const submit = handleSubmit(async values => {
        loading.value = true

        const response = await axiosClient
            .post('/api/project/new', {
                name: values.name,
                url: values.url,
                industry: values.industry,
                language: values.language
            })
            .catch(error => {
                if (error.response.status === 401) {
                    authStore.logout()
                }
            })

        if (response?.data) {
            authStore.addProject({
                id: response.data.id,
                name: response.data.name
            })
        }

        loading.value = false
    })
</script>

<template>
    <AppModal :closable="closeable">
        <h3 class="text-xl font-semibold text-center">New project</h3>

        <form
            @submit="submit"
            class="flex flex-col mt-6 mb-2 space-y-4 w-80"
        >
            <FormInput
                id="name"
                v-model="name"
                placeholder="Company LLC"
                :maxlength="255"
                :minlength="1"
                type="text"
                label="Name"
                :valid="name !== undefined && errors.name === undefined"
            >
                <template #icon>
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M4.75 17.25L8 6.75L11.25 17.25"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></path>
                        <path
                            d="M6 14.25H10"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></path>
                        <path
                            d="M19.25 14.5C19.25 16.0188 18.0188 17.25 16.5 17.25C14.9812 17.25 13.75 16.0188 13.75 14.5C13.75 12.9812 14.9812 11.75 16.5 11.75C18.0188 11.75 19.25 12.9812 19.25 14.5Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></path>
                        <path
                            d="M19.25 11.75V17.25"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></path>
                    </svg>
                </template>

                <template #error>
                    {{ errors.name }}
                </template>
            </FormInput>

            <FormInput
                id="url"
                v-model="url"
                placeholder="https://www.company.com"
                :maxlength="255"
                :minlength="1"
                type="url"
                label="Website Url"
                :valid="url !== undefined && errors.url === undefined"
            >
                <template #icon>
                    <svg
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            cx="12"
                            cy="12"
                            r="7.25"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                        ></circle>
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            d="M15.25 12C15.25 16.5 13.2426 19.25 12 19.25C10.7574 19.25 8.75 16.5 8.75 12C8.75 7.5 10.7574 4.75 12 4.75C13.2426 4.75 15.25 7.5 15.25 12Z"
                        ></path>
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            d="M5 12H12H19"
                        ></path>
                    </svg>
                </template>

                <template #error>
                    {{ errors.url }}
                </template>
            </FormInput>

            <FormInput
                id="industry"
                v-model="industry"
                placeholder="Finance SaaS"
                :maxlength="255"
                :minlength="1"
                type="text"
                label="Industry"
                :valid="industry !== undefined && errors.industry === undefined"
            >
                <template #icon>
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
                            d="M5.75 6.75C5.75 5.64543 6.64543 4.75 7.75 4.75H16.25C17.3546 4.75 18.25 5.64543 18.25 6.75V19.25H5.75V6.75Z"
                        ></path>
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            d="M19.25 19.25H4.75"
                        ></path>
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            d="M9.75 15.75C9.75 14.6454 10.6454 13.75 11.75 13.75H12.25C13.3546 13.75 14.25 14.6454 14.25 15.75V19.25H9.75V15.75Z"
                        ></path>
                        <circle
                            cx="10"
                            cy="10"
                            r="1"
                            fill="currentColor"
                        ></circle>
                        <circle
                            cx="14"
                            cy="10"
                            r="1"
                            fill="currentColor"
                        ></circle>
                    </svg>
                </template>

                <template #error>
                    {{ errors.industry }}
                </template>
            </FormInput>

            <FormInput
                id="language"
                v-model="language"
                placeholder="English"
                :maxlength="255"
                :minlength="1"
                type="text"
                label="Primary Language"
                :valid="language !== undefined && errors.language === undefined"
            >
                <template #icon>
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12.75 19.25L16 12.75L19.25 19.25"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></path>
                        <path
                            d="M14 17.25H18"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></path>
                        <path
                            d="M4.75 6.75H13.25"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></path>
                        <path
                            d="M9 6.5V4.75"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></path>
                        <path
                            d="M11.25 6.75C11.25 6.75 11.25 9.25 9.25 11.25C7.25 13.25 4.75 13.25 4.75 13.25"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></path>
                        <path
                            d="M12.25 13.25C12.25 13.25 9.75 13.25 7.75 11.25C7.34551 10.8455 6.75 9.75 6.75 9.75"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></path>
                    </svg>
                </template>

                <template #error>
                    {{ errors.language }}
                </template>
            </FormInput>

            <div class="pt-4">
                <button
                    type="submit"
                    class="flex items-center justify-center w-full py-2 text-sm transition-all bg-black rounded-md text-neutral-50 hover:bg-neutral-800 active:scale-95"
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

                    Create project
                </button>
            </div>

            <slot />
        </form>
    </AppModal>
</template>
