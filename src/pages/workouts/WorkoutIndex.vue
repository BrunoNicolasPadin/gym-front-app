<template>
    <layout :active="active" :breadcrumbItems="breadcrumbItems">
        <template #title>
            <span>Workouts</span>
        </template>

        <template #content>
            <table-actions>
                <table-input-search>
                    <input 
                        v-model="search"
                        @keyup="searchWorkout"
                        type="text"
                        placeholder="Search"
                        id="simple-search"
                        class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                    >
                </table-input-search>

                <div class="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
                    
                    <table-add-button 
                        routeName="workouts.create"
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

                        <table-filter-dropdown-list 
                            value="weeks"
                            label='Weeks'
                            labelFor='week'
                            name="filters"
                            v-model="filter"
                            @update:modelValue="value = $event"
                        />

                        <table-filter-dropdown-list 
                            value="start"
                            label='Start date'
                            labelFor='start'
                            name="filters"
                            v-model="filter"
                            @update:modelValue="value = $event"
                        />

                        <table-filter-dropdown-list 
                            value="end"
                            label='End date'
                            labelFor='end'
                            name="filters"
                            v-model="filter"
                            @update:modelValue="value = $event"
                        />
                    </table-filter-dropdown>
                </div>
            </table-actions>
            <div v-if="workouts.data !== []">
                <table-structure>
                    <template #headers>
                        <table-header colspan="1" header="Name" />
                        <table-header colspan="1" header="Weeks" />
                        <table-header colspan="1" header="Start" />
                        <table-header colspan="1" header="End" />
                        <table-header colspan="1" header="Days" />
                        <table-header colspan="2" header="Actions" />
                    </template>

                    <template #rows>
                        <tr v-for="workout in workouts.data" :key="workout.id" class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <table-row>{{ workout.name }}</table-row>
                            <table-row>{{ workout.weeks }}</table-row>
                            <table-row>{{ workout.start }}</table-row>
                            <table-row>{{ workout.end }}</table-row>
                            <table-row>
                                <router-link :to="{ name: 'days.index', params: { workout_id: workout.id }}" class="font-medium text-green-600 dark:text-green-500 hover:underline">Days</router-link>
                            </table-row>
                            <table-row>
                                <router-link :to="{ name: 'workouts.edit', params: { id: workout.id }}" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</router-link>
                            </table-row>
                            <table-row>
                                <span @click="removeWorkout(workout.id)" class="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">Delete</span>
                            </table-row>
                        </tr>
                    </template>
                </table-structure>

                <TailwindPagination
                    class="mt-4"
                    :data="workouts"
                    @pagination-change-page="searchWorkout"
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
    import TableActions from '@/components/TableActions.vue'
    import TableInputSearch from '@/components/TableInputSearch.vue'
    import TableAddButton from '@/components/TableAddButton.vue'
    import TableFilterDropdown from '@/components/TableFilterDropdown.vue'
    import TableFilterDropdownList from '@/components/TableFilterDropdownList.vue'
    import TableStructure from '@/components/TableStructure.vue'
    import TableHeader from '@/components/TableHeader.vue'
    import TableRow from '@/components/TableRow.vue'
    import useWorkouts from '@/composables/useWorkouts.js'

    const active = 'workouts.index'
    provide(/* key */ 'active', /* value */ active)
    const breadcrumbItems = ref([
        {
            id: 1,
            first: true,
            routeName: 'workouts.index',
            label: 'workouts',
            last: false,
        },
    ])

    const search = ref('')
    const filter = ref('name')

    const { workouts, getWorkouts, deleteWorkout } = useWorkouts()
    getWorkouts()

    function searchWorkout(page) {
        getWorkouts(page, search.value, filter.value)
    }

    function removeWorkout(id) {
        deleteWorkout(id)
    }

</script>