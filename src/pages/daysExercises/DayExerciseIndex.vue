<template>
    <layout :active="active" :breadcrumbItems="breadcrumbItems">
        <template #title>
            <span>Exercises of day</span>

            <div class="mt-4">
                <table-add-button 
                    routeName="daysExercises.create"
                />
            </div>
        </template>

        <template #content>
            <table-actions>
                    <h1 class="text-xl font-semibold">Exercise 1</h1>
                    
                    <div class="justify-end">
                        <table-add-button 
                            routeName=""
                        />
                    </div>
            </table-actions>
            <div v-if="days.data !== []">
                <table-structure>
                    <template #headers>
                        <table-header colspan="1" header="Set" />
                        <table-header colspan="2" header="Actions" />
                    </template>

                    <template #rows>
                        <tr v-for="day in days.data" :key="day.id" class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <table-row>{{ day.name }}</table-row>
                            <table-row>
                                <router-link :to="{ name: 'days.edit', params: { id: day.id }}" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</router-link>
                            </table-row>
                            <table-row>
                                <span @click="removeDay(day.id)" class="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">Delete</span>
                            </table-row>
                        </tr>
                    </template>
                </table-structure>
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
    const active = 'days.index'
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
    getDays(1, route.params.workout_id)

    function searchDay(page) {
        getDays(page, route.params.workout_id, search.value, filter.value)
    }

    function removeDay(id) {
        deleteDay(route.params.workout_id, id)
    }

</script>