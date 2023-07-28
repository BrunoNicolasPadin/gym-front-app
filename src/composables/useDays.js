import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000/api'

export default function useDays() {
    const router = useRouter()
    const days = ref([])
    const day = ref([])
    const errors = ref({})

    const getDays = async (page = 1, workout_id, search = '', filter = 'name') => {
        const response = await axios.get(`workouts/${workout_id}/days?page=${page}&filter[${filter}]=${search}`)
        days.value = await response.data
    }

    const addDay = async (workout_id, form) => {
        try {
            await axios.post(`workouts/${workout_id}/days`, form)
            
            router.push({
                name: 'days.index',
                params: { workout_id: workout_id }
            })
        } catch (e) {
            console.log(e)
            if(e && e.response && e.response.data && e.response.data.errors) {
                errors.value = e.response.data.errors
            }
        }
    }

    const getDay = async (workout_id, id) => {
        const response = await axios.get(`workouts/${workout_id}/days/${id}`)
        day.value = await response.data
    }

    const updateDay = async (workout_id, id, form) => {
        try {
            await axios.post(`workouts/${workout_id}/days/${id}`, form)
            
            router.push({
                name: 'days.index',
                params: { workout_id: workout_id },
            })
        } catch (e) {
            console.log(e)
            if(e && e.response && e.response.data && e.response.data.errors) {
                errors.value = e.response.data.errors
            }
        }
    }

    const deleteDay = async (workout_id, id) => {
        try {
            await axios.post(`workouts/${workout_id}/days/${id}`, {_method: 'delete'})
            getDays(1, workout_id, null, null)
        } catch (e) {
            console.log(e)
            if(e && e.response && e.response.data && e.response.data.errors) {
                errors.value = e.response.data.errors
            }
        }
    }

    return { days, getDays, addDay, errors, getDay, day, updateDay, deleteDay }
}