<template>
    <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
                Flowbite    
            </a>
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create and account
                    </h1>
                    <form-error-messages
                        :errors="userStore.errors"
                    />
                    <form class="space-y-4 md:space-y-6" @submit.prevent="post">
                        <form-input-text
                            type='text'
                            label='Name *'
                            labelFor="name"
                            v-model="form.name"
                            @update:modelValue="value = $event"
                            placeholderData="John Doe"
                            :requiredValue="true"
                        />
                        <form-input-text
                            type='email'
                            label='Email *'
                            labelFor="email"
                            v-model="form.email"
                            @update:modelValue="value = $event"
                            placeholderData="youemail@example.com"
                            :requiredValue="true"
                        />
                        <form-input-text
                            type='password'
                            label='Password *'
                            labelFor="password"
                            v-model="form.password"
                            @update:modelValue="value = $event"
                            placeholderData="••••••••"
                            :requiredValue="true"
                        />
                        <form-input-text
                            type='password'
                            label='Password confirmation *'
                            labelFor="password_confirmation"
                            v-model="form.password_confirmation"
                            @update:modelValue="value = $event"
                            placeholderData="••••••••"
                            :requiredValue="true"
                        />
                        <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account? <router-link :to="{ name: 'login' }" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</router-link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
        </section>
</template>

<script setup>
    import { ref } from 'vue'
    import FormErrorMessages from '@/components/FormErrorMessages.vue'
    import FormInputText from '@/components/FormInputText.vue'
    import { useUserStore } from '@/stores/userStore.js'

    const userStore = useUserStore()

    const form = ref({
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
    })

    function post() {
        userStore.register(form.value)
    }
</script>