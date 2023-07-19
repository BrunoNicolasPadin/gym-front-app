import { createWebHistory, createRouter } from 'vue-router'
import Home from '@/pages/Home.vue'
import LovIndex from '@/pages/lovs/LovIndex.vue'

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
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

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
	history: createWebHistory(),
	routes,
})

// 5. Export router
export default router