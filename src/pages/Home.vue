<template>
	<navbar-menu active="" />
</template>

<script setup>
	import { provide } from 'vue'
	import NavbarMenu from "@/components/NavbarMenu.vue";

	const active = 'home'
    provide(/* key */ 'active', /* value */ active)
</script>