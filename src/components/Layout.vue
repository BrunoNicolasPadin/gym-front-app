<template>
    <div class="bg-gray-50">
        <div class="min-h-screen max-w-screen mx-auto">
            <navbar-menu :active="active" />

            <breadcrumb-nav :breadcrumbItems="breadcrumbItems" />
            <div class="px-12 py-6">
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
    import NavbarMenu from '@/components/NavbarMenu.vue'
    import BreadcrumbNav from '@/components/BreadcrumbNav.vue'

    defineProps({
        active: String,
        breadcrumbItems: Object,
    })
</script>