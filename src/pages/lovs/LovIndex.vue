<template>
    <layout :active="active" :breadcrumbItems="breadcrumbItems">
        <template #title>
            <span>Lovs</span>
        </template>

        <template #content>
            <section class="flex">
                <div class="mx-auto w-full my-2">
                    <!-- Start coding here -->
                    <div class="bg-gray-50 shadow-md dark:bg-gray-800 sm:rounded-lg">
                        <div class="flex flex-col items-center justify-between p-3 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                            <div class="w-full md:w-1/2">
                                <form class="flex items-center">
                                    <label for="simple-search" class="sr-only">Search</label>
                                    <div class="relative w-full">
                                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                        <input v-model="search" @keyup="searchLov" type="text" id="simple-search" class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search">
                                    </div>
                                </form>
                            </div>
                            <div class="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
                                <button type="button" class="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                    <svg class="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                    </svg>
                                    Add
                                </button>
                                <button id="filterDropdownButton" data-dropdown-toggle="filterDropdown" class="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="w-4 h-4 mr-2 text-gray-400" viewbox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
                                    </svg>
                                    Filter
                                    <svg class="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                    </svg>
                                </button>
                                <!-- Dropdown menu -->
                                <div id="filterDropdown" class="z-10 hidden w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700">
                                    <ul class="space-y-2 text-sm" aria-labelledby="dropdownDefault">
                                        <li class="flex items-center">
                                            <input id="category" type="radio" value="category" v-model="filter"
                                                class="w-4 h-4 bg-gray-100 border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label for="category" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                                                Category
                                            </label>
                                        </li>
                                        <li class="flex items-center">
                                            <input id="label" type="radio" value="label" v-model="filter"
                                                class="w-4 h-4 bg-gray-100 border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label for="label" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                                                Label
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </section>
            <div v-if="lovs.data !== []">
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full shadow-sm text-sm text-center text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    category
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    label
                                </th>
                                <th colspan="2" class="px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="lov in lovs.data" :key="lov.id" class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {{ lov.category }}
                                </th>
                                <td class="px-6 py-4">
                                    {{ lov.label }}
                                </td>
                                <td class="px-6 py-4">
                                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                </td>
                                <td class="px-6 py-4">
                                    <a href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <TailwindPagination
                    class="mt-4"
                    :data="lovs"
                    @pagination-change-page="getLovs"
                />
            </div>
            <div v-else class="mt-4">
                <span class="text-xl">
                    There is nothing
                </span>
            </div>

        </template>
    </layout>
</template>

<script setup>
    import { ref } from 'vue'
    import Layout from '@/components/Layout.vue'
    import useLovs from '@/composables/useLovs.js'

    const active = 'lovs.index'
    const breadcrumbItems = ref([
        {
            id: 1,
            first: true,
            routeName: 'lovs.index',
            label: 'Lovs',
            last: false,
        },
    ])

    const search = ref('')
    const filter = ref('label')

    const { lovs, getLovs } = useLovs()
    getLovs(1, search.value)

    function searchLov() {
        getLovs(1, search.value, filter.value)
    }
</script>