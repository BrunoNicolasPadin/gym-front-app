<template>
    <layout :active="active" :breadcrumbItems="breadcrumbItems">
        <template #content>
            <h2>aaa</h2>
        </template>
    </layout>
</template>

<script setup>
    import { ref } from 'vue'
    import Layout from '@/components/Layout.vue'

    const active = 'lovs.index'
    const breadcrumbItems = ref([
        {
            id: 1,
            first: true,
            routeName: 'lovs.index',
            label: 'Lovs',
            last: false,
        },
    ])
</script>