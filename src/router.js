import { createWebHistory, createRouter } from 'vue-router'

import Home from '@/pages/Home.vue'
import LovIndex from '@/pages/lovs/LovIndex.vue'
import LovCreate from '@/pages/lovs/LovCreate.vue'
import LovEdit from '@/pages/lovs/LovEdit.vue'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/lovs',
		name: 'lovs.index',
		component: LovIndex,
	},
	{
		path: '/lovs/create',
		name: 'lovs.create',
		component: LovCreate,
	},
	{
		path: '/lovs/:id/edit',
		name: 'lovs.edit',
		component: LovEdit,
	},
	{
		path: '/exercises',
		name: 'exercises.index',
		component: LovIndex,
	},
	{
		path: '/workouts',
		name: 'workouts.index',
		component: LovIndex,
	},
	{
		path: '/trainings',
		name: 'trainings.index',
		component: LovIndex,
	},
	{
		path: '/body',
		name: 'bodies.index',
		component: LovIndex,
	},
	{
		path: '/one-rep-max',
		name: 'oneRepMax.index',
		component: LovIndex,
	},
	{
		path: '/weights',
		name: 'weights.index',
		component: LovIndex,
	},
	{
		path: '/goals',
		name: 'goals.index',
		component: LovIndex,
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router