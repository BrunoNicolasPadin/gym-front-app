<template>
    <li v-for="item in items" :key="item.id">
        <router-link v-if="item.dropdownItems === null" :to="{ name: item.routeName }" 
            class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
            {{ item.label }}
        </router-link>
        <div v-else>
            <navbar-item-dropdown :item="item" />
        </div>
    </li>
</template>

<script setup>
    import NavbarItemDropdown from "@/components/NavbarItemDropdown.vue";

    defineProps({
        items: Object,
    })
</script>