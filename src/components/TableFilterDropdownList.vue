<template>
    <li class="flex items-center">
        <input 
            :value="value"
            :checked="isChecked"
            @change="$emit('update:modelValue', $event.target.value)"
            :id="labelFor" 
            type="radio"
            :name="name"
            class="w-4 h-4 bg-gray-100 border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" 
        />
        <label :for="labelFor" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
            {{ label }}
        </label>
    </li>
</template>

<script setup>
import { computed } from 'vue';
    const props = defineProps({
        label: String,
        labelFor: String,
        modelValue: String,
        value: String,
        name: String,
    })

    defineEmits(['update:modelValue'])

    const isChecked = computed(() => {
        return props.modelValue === props.value;
    });
</script>