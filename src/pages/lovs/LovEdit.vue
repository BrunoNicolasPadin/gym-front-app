<template>
    <layout :active="active" :breadcrumbItems="breadcrumbItems">
        <template #content>
            <div class="my-4">
                <ul>
                    <li v-for="(error, index) in errors" :key="index">
                     <span>-<span class="text-red-600">{{ error[0] }}</span></span>
                    </li>
                </ul>
            </div>
            <form @submit.prevent="put">
                <div class="grid grid-cols-2 gap-x-2 mb-6">
                    <div>
                        <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                        <input type="text" v-model="form.category" required autofocus placeholder="Muscles" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                    <div>
                        <label for="label" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Label</label>
                        <input type="text" v-model="form.label" required placeholder="Biceps" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                </div>

                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>

        </template>
    </layout>
</template>

<script setup>
    import { computed, ref } from 'vue'
    import { useRoute } from 'vue-router'
    import Layout from '@/components/Layout.vue'
    import useLovs from '@/composables/useLovs.js'

    const route = useRoute()
    const active = 'lovs.index'
    const breadcrumbItems = ref([
        {
            id: 1,
            first: true,
            routeName: 'lovs.index',
            label: 'Lovs',
            last: false,
        },
        {
            id: 2,
            first: false,
            routeName: null,
            label: 'Edit',
            last: true,
        },
    ])

    const form = ref({
        category: null,
        label: null,
        _method: 'put',
    })

    const { errors, getLov, lov, updateLov } = useLovs()
    getLov(route.params.id).then(() => {
        form.value.category = lov.value.category
        form.value.label = lov.value.label
    })

    function put() {
        updateLov(route.params.id, form.value)
    }
</script>