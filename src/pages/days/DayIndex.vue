<template>
    <layout :active="active" :breadcrumbItems="breadcrumbItems">
        <template #title>
            <span>Days</span>
        </template>

        <template #content>
            <table-actions>
                <table-input-search>
                    <input 
                        v-model="search"
                        @keyup="searchDay"
                        type="text"
                        placeholder="Search"
                        id="simple-search"
                        class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                    >
                </table-input-search>

                <div class="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
                    
                    <table-add-button 
                        routeName="days.create"
                    />

                    <table-filter-dropdown>
                        <table-filter-dropdown-list 
                            value="name"
                            label='Name'
                            labelFor='name'
                            name="filters"
                            v-model="filter"
                            @update:modelValue="value = $event"
                        />
                    </table-filter-dropdown>
                </div>
            </table-actions>
            <div v-if="days.data !== []">
                <table-structure>
                    <template #headers>
                        <table-header colspan="1" header="Name" />
                        <table-header colspan="3" header="Actions" />
                    </template>

                    <template #rows>
                        <tr v-for="day in days.data" :key="day.id" class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <table-row>{{ day.name }}</table-row>
                            <table-row>
                                <router-link :to="{ name: 'daysExercises.index', params: { workout_id: workout_id, day_id: day.id }}" class="font-medium text-green-600 dark:text-green-500 hover:underline">Exercises</router-link>
                            </table-row>
                            <table-row>
                                <router-link :to="{ name: 'days.edit', params: { workout_id: workout_id, id: day.id }}" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</router-link>
                            </table-row>
                            <table-row>
                                <span @click="removeDay(day.id)" class="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">Delete</span>
                            </table-row>
                        </tr>
                    </template>
                </table-structure>

                <TailwindPagination
                    class="mt-4"
                    :data="days"
                    @pagination-change-page="searchDay"
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
    import { useRoute } from 'vue-router'
    import Layout from '@/components/Layout.vue'
    import TableActions from '@/components/TableActions.vue'
    import TableInputSearch from '@/components/TableInputSearch.vue'
    import TableAddButton from '@/components/TableAddButton.vue'
    import TableFilterDropdown from '@/components/TableFilterDropdown.vue'
    import TableFilterDropdownList from '@/components/TableFilterDropdownList.vue'
    import TableStructure from '@/components/TableStructure.vue'
    import TableHeader from '@/components/TableHeader.vue'
    import TableRow from '@/components/TableRow.vue'
    import useDays from '@/composables/useDays.js'

    const route = useRoute()
    const workout_id = route.params.workout_id
    const active = 'workouts.index'
    provide(/* key */ 'active', /* value */ active)
    const breadcrumbItems = ref([
        {
            id: 1,
            first: true,
            routeName: 'workouts.index',
            label: 'Workouts',
            last: false,
        },
        {
            id: 2,
            first: false,
            routeName: 'days.index',
            label: 'Days',
            last: true,
        },
    ])

    const search = ref('')
    const filter = ref('name')

    const { days, getDays, deleteDay } = useDays()
    getDays(1, workout_id)

    function searchDay(page) {
        getDays(page, workout_id, search.value, filter.value)
    }

    function removeDay(id) {
        deleteDay(workout_id, id)
    }

</script>