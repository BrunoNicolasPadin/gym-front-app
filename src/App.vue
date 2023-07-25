<template>
	<router-view v-slot="{Component}">
		<transition name="slide" mode="out-in">
			<component :is="Component" :key="$route.path"></component>
		</transition>
	</router-view>
</template>

<style>
	.slide-enter-active,
	.slide-leave-active {
		transition: opacity 1s, transform 1s;
	}

	.slide-enter-from,
	.slide-leave-to {
		transform: translateX(-100%);
	}
</style>