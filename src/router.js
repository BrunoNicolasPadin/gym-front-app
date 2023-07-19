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