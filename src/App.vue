<script setup>
  import Menubar from 'primevue/menubar'
	import { ref } from 'vue';
  const items = ref([
	{
		label: 'Lovs',
	},
	{
		label: 'Exercises',
	},
	{
		label: 'Workout',
	},
	{
		label: 'Training',
	},
	{
		label: 'Marks',
		items: [
			{
				label: 'Body',
			},
			{
				label: '1RM',
			},
			{
				label: 'Weight',
			},
			{
				label: 'Goals',
			}
		]
	},
	{
		label: 'Login',
	},
	{
		label: 'Register',
	},
]);
</script>

<template>
	<div class="card relative z-2">
		<Menubar :model="items" />
	</div>
</template>