<template>
    <layout :active="active" :breadcrumbItems="breadcrumbItems">
        <template #title>
            <span>Lovs</span>
        </template>

        <template #content>
            <table-actions>
                <table-input-search>
                    <input 
                        v-model="search"
                        @keyup="searchLov"
                        type="text"
                        placeholder="Search"
                        id="simple-search"
                        class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                    >
                </table-input-search>

                <div class="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
                    
                    <table-add-button 
                        routeName="lovs.create"
                    />

                    <table-filter-dropdown>
                        <table-filter-dropdown-list 
                            value="category"
                            label='Category'
                            labelFor='category'
                            name="filterss"
                            v-model="filter"
                            @update:modelValue="value = $event"
                        />

                        <table-filter-dropdown-list 
                            value="label"
                            label='Label'
                            labelFor='label'
                            name="filterss"
                            v-model="filter"
                            @update:modelValue="value = $event"
                        />
                    </table-filter-dropdown>
                </div>
            </table-actions>
            <div v-if="lovs.data !== []">
                <table-structure>
                    <template #headers>
                        <table-header colspan="1" header="Category" />
                        <table-header colspan="1" header="Label" />
                        <table-header colspan="2" header="Actions" />
                    </template>

                    <template #rows>
                        <tr v-for="lov in lovs.data" :key="lov.id" class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <table-row>
                                {{ lov.category }}
                            </table-row>
                            <table-row>
                                {{ lov.label }}
                            </table-row>
                            <table-row>
                                <router-link :to="{ name: 'lovs.edit', params: { id: lov.id }}" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</router-link>
                            </table-row>
                            <table-row>
                                <span @click="removeLov(lov.id)" class="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">Delete</span>
                            </table-row>
                        </tr>
                    </template>
                </table-structure>

                <TailwindPagination
                    class="mt-4"
                    :data="lovs"
                    @pagination-change-page="searchLov"
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
    import { ref, provide } from 'vue'
    import Layout from '@/components/Layout.vue'
    import useLovs from '@/composables/useLovs.js'
    import TableActions from '@/components/TableActions.vue'
    import TableInputSearch from '@/components/TableInputSearch.vue'
    import TableAddButton from '@/components/TableAddButton.vue'
    import TableFilterDropdown from '@/components/TableFilterDropdown.vue'
    import TableFilterDropdownList from '@/components/TableFilterDropdownList.vue'
    import TableStructure from '@/components/TableStructure.vue'
    import TableHeader from '@/components/TableHeader.vue'
    import TableRow from '@/components/TableRow.vue'

    const active = 'lovs.index'
    provide(/* key */ 'active', /* value */ active)
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

    const { lovs, getLovs, deleteLov } = useLovs()
    getLovs()

    function searchLov(page) {
        getLovs(page, search.value, filter.value)
    }

    function removeLov(id) {
        deleteLov(id)
        getLovs(1, search.value)
    }

</script>