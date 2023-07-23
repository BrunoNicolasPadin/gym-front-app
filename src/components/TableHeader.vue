<template>
    <th :colspan="colspan" class="px-6 py-3">
        {{ header }}
    </th>
</template>

<script setup>
    defineProps({
        colspan: String,
        header: String,
    })
</script>