<template>
    <layout :active="active">
        <template #content>
            <h2>aaa</h2>
        </template>
    </layout>
</template>

<script setup>
    import Layout from '@/components/Layout.vue'

    const active = 'lovs.index'
</script>