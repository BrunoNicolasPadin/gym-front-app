<template>
    <header>
        <nav class="bg-gray-50 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
            <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                <router-link :to="{name: 'home'}" class="flex items-center">
                    <img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                    <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Gym app</span>
                </router-link>
                <div class="flex items-center lg:order-2">
                    <a href="#" class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Log in</a>
                    <a href="#" class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Get started</a>
                </div>
                <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                    <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                        <navbar-item :items="items" :active="active" />
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<script setup>
    import { ref } from 'vue'
    import NavbarItem from '@/components/NavbarItem.vue'

    defineProps({
        active: String,
    })

    const items = ref([
        {
            id: 1,
            label: 'Lovs',
            routeName: 'lovs.index',
            dropdownItems: null,
        },
        {
            id: 2,
            label: 'Exercises',
            routeName: 'exercises.index',
            dropdownItems: null,
        },
        {
            id: 3,
            label: 'Workouts',
            routeName: 'workouts.index',
            dropdownItems: null,
        },
        {
            id: 4,
            label: 'Trainings',
            routeName: 'trainings.index',
            dropdownItems: null,
        },
        {
            id: 5,
            label: 'Marks',
            routeName: null,
            dropdownItems: [
                {
                    id: 1,
                    label: 'Body',
                    routeName: 'bodies.index'
                },
                {
                    id: 2,
                    label: '1RM',
                    routeName: 'oneRepMax.index'
                },
                {
                    id: 3,
                    label: 'Weight',
                    routeName: 'weights.index'
                },
                {
                    id: 4,
                    label: 'Goals',
                    routeName: 'goals.index'
                }
            ]
        },
    ]);
</script>