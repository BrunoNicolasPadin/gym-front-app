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
                            placeholderData="Bench press"
                            :requiredValue="true"
                        />
                    </div>
                    <div>
                        <form-input-text
                            type='text'
                            label='YouTube link'
                            labelFor="youtube"
                            v-model="form.youtube"
                            @update:modelValue="value = $event"
                            placeholderData="https://www.youtube.com/watch?v=zpVBUl3OnWM"
                            :requiredValue="false"
                        />
                    </div>
                </form-grid>

                <div class="grid grid-cols-1 gap-x-2 mb-6">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Image</label>
                    <input @change="uploadFile($event)" accept="image/*" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file">
                </div>

                <div class="grid grid-cols-1 gap-x-2 mb-6">
                    <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <textarea id="description" v-model="form.description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your description here..."></textarea>
                </div>

                <hr class="p-px bg-gray-200 my-6">

                <div class="my-6">
                    <h3 class="mb-4 font-semibold text-gray-900 dark:text-white">Muscles worked</h3>
                    <ul class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li v-for="muscle in lovs" :key="muscle.id" class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                            <div class="flex items-center pl-3">
                                <div v-if="musclesAlreadySelected.find(e => e.muscle_id === muscle.id)">
                                    <input id="muscle" type="checkbox" checked :name="muscle.label" :value="muscle.id" v-model="form.muscles" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                                </div>
                                <div v-else>
                                    <input id="muscle" type="checkbox" :name="muscle.label" :value="muscle.id" v-model="form.muscles" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                                </div>
                                <label for="muscle" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ muscle.label }}</label>
                            </div>
                        </li>
                    </ul>
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
    import useLovs from '@/composables/useLovs.js'
    import useExercises from '@/composables/useExercises.js'

    const route = useRoute()
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
        {
            id: 2,
            first: false,
            routeName: null,
            label: 'Edit',
            last: true,
        },
    ])
    const form = ref({
        name: '',
        description: '',
        image: '',
        youtube: '',
        muscles: [],
        _method: 'put',
    })
    const musclesAlreadySelected = ref([])
    const { getLovsWithoutPaginate, lovs } = useLovs()
    const { errors, getExercise, exercise, updateExercise } = useExercises()
    const uploadFile = (event) => {
        form.value.image = event.target.files[0]
    }

    getExercise(route.params.id).then(() => {
        form.value.name = exercise.value.name
        form.value.description = exercise.value.description
        form.value.youtube = exercise.value.youtube
        for (let index = 0; index < exercise.value.exercise_muscle.length; index++) {
            musclesAlreadySelected.value.push(exercise.value.exercise_muscle[index].muscle_id)
        }
        form.value.muscles = musclesAlreadySelected.value
        getLovsWithoutPaginate('Muscle')
    })

    function put() {
        var formData = new FormData()
        formData.append('name', form.value.name)
        formData.append('image', form.value.image)
        formData.append('description', form.value.description)
        formData.append('youtube', form.value.youtube)
        formData.append('muscles', form.value.muscles)
        formData.append('_method', form.value._method)
        updateExercise(route.params.id, formData)
    }
</script>