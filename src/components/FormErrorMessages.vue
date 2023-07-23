<template>
    <div class="my-4">
        <ul>
            <li v-for="(error, index) in errors" :key="index">
                <span>-<span class="text-red-600">{{ error[0] }}</span></span>
            </li>
        </ul>
    </div>
</template>

<script setup>
    defineProps({
        errors: Object
    })
</script>