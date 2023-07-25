import { createWebHistory, createRouter } from 'vue-router'

import Home from '@/pages/Home.vue'

const routes = [
	{
		path: '/:pathMatch(.*)*',
		name: 'notFound',
		component: () => import(/* webpackChunkName: "404Error" */ '@/pages/errors/404.vue'),
	},
	{
		path: '/',
		name: 'home',
		component: Home,
		alias: '/home'
	},
	{
		path: '/lovs',
		name: 'lovs.index',
		component: () => import(/* webpackChunkName: "LovIndex" */ '@/pages/lovs/LovIndex.vue'),
	},
	{
		path: '/lovs/create',
		name: 'lovs.create',
		component: () => import(/* webpackChunkName: "LovCreate" */ '@/pages/lovs/LovCreate.vue'),
	},
	{
		path: '/lovs/:id(\\d+)+/edit',
		name: 'lovs.edit',
		component: () => import(/* webpackChunkName: "LovEdit" */ '@/pages/lovs/LovEdit.vue'),
	},
	{
		path: '/exercises',
		name: 'exercises.index',
		component: () => import(/* webpackChunkName: "LovIndex" */ '@/pages/lovs/LovIndex.vue'),
	},
	{
		path: '/workouts',
		name: 'workouts.index',
		component: () => import(/* webpackChunkName: "LovIndex" */ '@/pages/lovs/LovIndex.vue'),
	},
	{
		path: '/trainings',
		name: 'trainings.index',
		component: () => import(/* webpackChunkName: "LovIndex" */ '@/pages/lovs/LovIndex.vue'),
	},
	{
		path: '/body',
		name: 'bodies.index',
		component: () => import(/* webpackChunkName: "LovIndex" */ '@/pages/lovs/LovIndex.vue'),
	},
	{
		path: '/one-rep-max',
		name: 'oneRepMax.index',
		component: () => import(/* webpackChunkName: "LovIndex" */ '@/pages/lovs/LovIndex.vue'),
	},
	{
		path: '/weights',
		name: 'weights.index',
		component: () => import(/* webpackChunkName: "LovIndex" */ '@/pages/lovs/LovIndex.vue'),
	},
	{
		path: '/goals',
		name: 'goals.index',
		component: () => import(/* webpackChunkName: "LovIndex" */ '@/pages/lovs/LovIndex.vue'),
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior (to, from, savedPosition) {
		return savedPosition || { top:0 }
	}
})

export default router