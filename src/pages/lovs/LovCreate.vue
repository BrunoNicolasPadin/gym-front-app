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
                            label='Category *'
                            labelFor="category"
                            v-model="form.category"
                            @update:modelValue="value = $event"
                            placeholderData="Muscle"
                            :requiredValue="true"
                        />
                    </div>
                    <div>
                        <form-input-text
                            label='Label *'
                            labelFor="label"
                            v-model="form.label"
                            @update:modelValue="value = $event"
                            placeholderData="Biceps"
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
    import { ref } from 'vue'
    import Layout from '@/components/Layout.vue'
    import FormErrorMessages from '@/components/FormErrorMessages.vue'
    import FormGrid from '@/components/FormGrid.vue'
    import FormInputText from '@/components/FormInputText.vue'
    import FormButtonSubmit from '@/components/FormButtonSubmit.vue'
    import useLovs from '@/composables/useLovs.js'

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
            label: 'Create',
            last: true,
        },
    ])

    const form = ref({
        category: null,
        label: null,
    })

    const { addLov, errors } = useLovs()

    function post() {
        addLov(form.value)
    }
</script>