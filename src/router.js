import { createWebHistory, createRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

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
		path: '/register',
		name: 'register',
		component: () => import(/* webpackChunkName: "Register" */ '@/pages/auth/Register.vue'),
	},
	{
		path: '/login',
		name: 'login',
		component: () => import(/* webpackChunkName: "Login" */ '@/pages/auth/Login.vue'),
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
		component: () => import(/* webpackChunkName: "ExerciseIndex" */ '@/pages/exercises/ExerciseIndex.vue'),
	},
	{
		path: '/exercises/create',
		name: 'exercises.create',
		component: () => import(/* webpackChunkName: "ExerciseCreate" */ '@/pages/exercises/ExerciseCreate.vue'),
	},
	{
		path: '/exercises/:id(\\d+)+/edit',
		name: 'exercises.edit',
		component: () => import(/* webpackChunkName: "ExerciseEdit" */ '@/pages/exercises/ExerciseEdit.vue'),
	},
	{
		path: '/workouts',
		name: 'workouts.index',
		component: () => import(/* webpackChunkName: "WorkoutIndex" */ '@/pages/workouts/WorkoutIndex.vue'),
	},
	{
		path: '/workouts/create',
		name: 'workouts.create',
		component: () => import(/* webpackChunkName: "WorkoutCreate" */ '@/pages/workouts/WorkoutCreate.vue'),
	},
	{
		path: '/workouts/:id(\\d+)+/edit',
		name: 'workouts.edit',
		component: () => import(/* webpackChunkName: "WorkoutEdit" */ '@/pages/workouts/WorkoutEdit.vue'),
	},
	{
		path: '/workouts/:workout_id(\\d+)+/days',
		name: 'days.index',
		component: () => import(/* webpackChunkName: "DayIndex" */ '@/pages/days/DayIndex.vue'),
	},
	{
		path: '/workouts/:workout_id(\\d+)+/days/create',
		name: 'days.create',
		component: () => import(/* webpackChunkName: "DayCreate" */ '@/pages/days/DayCreate.vue'),
	},
	{
		path: '/workouts/:workout_id(\\d+)+/days/:id(\\d+)+/edit',
		name: 'days.edit',
		component: () => import(/* webpackChunkName: "DayEdit" */ '@/pages/days/DayEdit.vue'),
	},
	{
		path: '/workouts/:workout_id(\\d+)+/days/:day_id(\\d+)+/exercises',
		name: 'daysExercises.index',
		component: () => import(/* webpackChunkName: "DayExerciseIndex" */ '@/pages/daysExercises/DayExerciseIndex.vue'),
	},
	{
		path: '/workouts/:workout_id(\\d+)+/days/:day_id(\\d+)+/exercises/create',
		name: 'daysExercises.create',
		component: () => import(/* webpackChunkName: "DayExerciseCreate" */ '@/pages/daysExercises/DayExerciseCreate.vue'),
	},
	{
		path: '/workouts/:workout_id(\\d+)+/days/:day_id(\\d+)+/exercises/:id(\\d+)+/edit',
		name: 'daysExercises.edit',
		component: () => import(/* webpackChunkName: "DayExerciseEdit" */ '@/pages/daysExercises/DayExerciseEdit.vue'),
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

router.beforeEach(async (to, from) => {
    const userStore = useUserStore();

	if (userStore.auth && to.name == 'login') {
		return {
        	name: 'home' 
      	}
	}

	else if (userStore.auth && to.name == 'register') {
		return {
        	name: 'home' 
      	}
	}

	else if (!userStore.auth && to.name !== 'login' && to.name !== 'register') {
		return {
        	name: 'login' 
      	}
	}
  })

export default router