import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000/api'

export default function useWorkouts() {
    const router = useRouter()
    const workouts = ref([])
    const workout = ref([])
    const errors = ref({})

    const getWorkouts = async (page = 1, search = '', filter = 'name') => {
        const response = await axios.get(`/workouts?page=${page}&filter[${filter}]=${search}`)
        workouts.value = await response.data
    }

    const addWorkout = async (form) => {
        try {
            await axios.post('/workouts', form)
            
            router.push({
                name: 'workouts.index',
            })
        } catch (e) {
            console.log(e)
            if(e && e.response && e.response.data && e.response.data.errors) {
                errors.value = e.response.data.errors
            }
        }
    }

    const getWorkout = async (id) => {
        const response = await axios.get(`/workouts/${id}`)
        workout.value = await response.data
    }

    const updateWorkout = async (id, form) => {
        try {
            await axios.post(`workouts/${id}`, form)
            
            router.push({
                name: 'workouts.index',
            })
        } catch (e) {
            console.log(e)
            if(e && e.response && e.response.data && e.response.data.errors) {
                errors.value = e.response.data.errors
            }
        }
    }

    const deleteWorkout = async (id) => {
        try {
            await axios.post(`/workouts/${id}`, {_method: 'delete'})
            getWorkouts(1)
        } catch (e) {
            console.log(e)
            if(e && e.response && e.response.data && e.response.data.errors) {
                errors.value = e.response.data.errors
            }
        }
    }

    return { workouts, getWorkouts, addWorkout, errors, getWorkout, workout, updateWorkout, deleteWorkout }
}