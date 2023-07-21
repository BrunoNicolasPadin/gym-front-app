<template>
    <div class="bg-gray-50">
        <div class="min-h-screen max-w-screen mx-auto">
            <navbar-menu :active="active" />

            <breadcrumb-nav :breadcrumbItems="breadcrumbItems" />
            <div class="px-12 py-6">
                <div class="mb-3">
                    <span class="text-2xl font-medium text-gray-900 dark:text-white">
                        <slot name="title"></slot>
                    </span>
                </div>
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