<template>
    <layout :active="active" :breadcrumbItems="breadcrumbItems">
        <template #content>
            <form-error-messages
                :errors="errors"
            />
            <form @submit.prevent="post">
                <form-grid>
                    <div>
                        <form-input-text
                            type='text'
                            label='Name *'
                            labelFor="name"
                            v-model="form.name"
                            @update:modelValue="value = $event"
                            placeholderData="Day 1"
                            :requiredValue="true"
                        />
                    </div>
                </form-grid>
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
            last: false,
        },
        {
            id: 3,
            first: false,
            routeName: 'days.create',
            label: 'Create',
            last: true,
        },
    ])

    const form = ref({
        name: null,
    })

    const { addDay, errors } = useDays()

    function post() {
        addDay(route.params.workout_id, form.value)
    }
</script>