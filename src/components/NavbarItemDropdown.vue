<template>
    <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" class="flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">{{ item.label }} <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
        </svg>
    </button>
    <!-- Dropdown menu -->
    <div id="dropdownNavbar" class="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
        <ul class="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
            <li v-for="dropdownItem in item.dropdownItems" :key="dropdownItem.id">
                <router-link
                :to="{ name: dropdownItem.routeName }" 
                :class="[ item.routeName == active ? 
                'block px-4 py-2 bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white' : 
                'block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white']">
                {{ dropdownItem.label }}
            </router-link>
            </li>
        </ul>
    </div>
</template>

<script setup>
    defineProps({
        item: Object,
        active: String,
    })
</script>