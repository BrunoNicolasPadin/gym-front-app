<template>
    <layout :active="active" :breadcrumbItems="breadcrumbItems">
        <template #content>
            <form-error-messages
                :errors="errors"
            />
            <form @submit.prevent="put">
                <form-grid>
                    <div>
                        <form-input-text
                            type='text'
                            label='Name *'
                            labelFor="name"
                            v-model="form.name"
                            @update:modelValue="value = $event"
                            placeholderData="Powerlifting intermediate program"
                            :requiredValue="true"
                        />
                    </div>
                    <div>
                        <form-input-text
                            type='number'
                            label='Weeks'
                            labelFor="weeks"
                            v-model="form.weeks"
                            @update:modelValue="value = $event"
                            placeholderData="10"
                            :requiredValue="false"
                        />
                    </div>
                </form-grid>

                <form-grid>
                    <div>
                        <form-input-text
                            type='date'
                            label='Start date *'
                            labelFor="start"
                            v-model="form.start"
                            @update:modelValue="value = $event"
                            placeholderData="09/12/1995"
                            :requiredValue="true"
                        />
                    </div>
                    <div>
                        <form-input-text
                            type='date'
                            label='End date'
                            labelFor="end"
                            v-model="form.end"
                            @update:modelValue="value = $event"
                            placeholderData=""
                            :requiredValue="false"
                        />
                    </div>
                </form-grid>

                <div class="grid grid-cols-1 gap-x-2 mb-6">
                    <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <textarea id="description" v-model="form.description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your description here..."></textarea>
                </div>

                <form-button-submit
                    action="Submit" 
                />
            </form>

        </template>
    </layout>
</template>

<script setup>
    import { ref, provide } from 'vue'
    import { useRoute } from 'vue-router'
    import Layout from '@/components/Layout.vue'
    import FormErrorMessages from '@/components/FormErrorMessages.vue'
    import FormGrid from '@/components/FormGrid.vue'
    import FormInputText from '@/components/FormInputText.vue'
    import FormButtonSubmit from '@/components/FormButtonSubmit.vue'
    import useWorkouts from '@/composables/useWorkouts.js'

    const route = useRoute()
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
            routeName: null,
            label: 'Edit',
            last: true,
        },
    ])

    const form = ref({
        name: null,
        weeks: null,
        start: null,
        end: null,
        description: null,
        _method: 'put',
    })

    const { errors, getWorkout, workout, updateWorkout } = useWorkouts()
    getWorkout(route.params.id).then(() => {
        form.value.name = workout.value.name
        form.value.weeks = workout.value.weeks
        form.value.start = workout.value.start
        form.value.end = workout.value.end
        form.value.description = workout.value.description
    })

    function put() {
        updateWorkout(route.params.id, form.value)
    }
</script>