<template>
    <layout :active="active" :breadcrumbItems="breadcrumbItems">
        <template #title>
            <span>Exercises</span>
        </template>

        <template #content>
            <table-actions>
                <table-input-search>
                    <input 
                        v-model="search"
                        @keyup="searchExercise"
                        type="text"
                        placeholder="Search"
                        id="simple-search"
                        class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                    >
                </table-input-search>

                <div class="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
                    
                    <table-add-button 
                        routeName="exercises.create"
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
                            value="musclesWorked"
                            label='Muscle worked'
                            labelFor='musclesWorked'
                            name="filters"
                            v-model="filter"
                            @update:modelValue="value = $event"
                        />
                    </table-filter-dropdown>
                </div>
            </table-actions>
            <div v-if="exercises.data !== []">
                <table-structure>
                    <template #headers>
                        <table-header colspan="1" header="Name" />
                        <table-header colspan="1" header="Image" />
                        <table-header colspan="1" header="Video" />
                        <table-header colspan="2" header="Actions" />
                    </template>

                    <template #rows>
                        <tr v-for="exercise in exercises.data" :key="exercise.id" class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <table-row>{{ exercise.name }}</table-row>
                            <table-row>
                                <div v-if="exercise.image">
                                    <img class="h-20 w-full" :src="`http://localhost:8000/storage/${exercise.image}`" alt="Exercise photo">
                                </div>
                            </table-row>
                            <table-row><a :href="exercise.youtube" target="_blank" rel="noopener noreferrer" class="hover:underline hover:text-blue-500">{{ exercise.youtube }}</a></table-row>
                            <table-row>
                                <router-link :to="{ name: 'exercises.edit', params: { id: exercise.id }}" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</router-link>
                            </table-row>
                            <table-row>
                                <span @click="removeExercise(exercise.id)" class="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">Delete</span>
                            </table-row>
                        </tr>
                    </template>
                </table-structure>

                <TailwindPagination
                    class="mt-4"
                    :data="exercises"
                    @pagination-change-page="searchExercise"
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
    import useExercises from '@/composables/useExercises.js'

    const active = 'exercises.index'
    provide(/* key */ 'active', /* value */ active)
    const breadcrumbItems = ref([
        {
            id: 1,
            first: true,
            routeName: 'exercises.index',
            label: 'Exercises',
            last: false,
        },
    ])

    const search = ref('')
    const filter = ref('name')

    const { exercises, getExercises, deleteExercise } = useExercises()
    getExercises()

    function searchExercise(page) {
        getExercises(page, search.value, filter.value)
    }

    function removeExercise(id) {
        deleteExercise(id)
        getExercises(1, search.value)
    }

</script>