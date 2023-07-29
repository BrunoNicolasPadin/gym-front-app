import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000/api'

export default function useDaysExercises() {
    const router = useRouter()
    const daysExercises = ref([])
    const dayExercise = ref([])
    const errors = ref({})

    const getDaysExercises = async (workout_id, day_id) => {
        const response = await axios.get(`workouts/${workout_id}/days/${day_id}/exercises`)
        daysExercises.value = await response.data
    }

    const addDayExercise = async (workout_id, day_id, form) => {
        try {
            await axios.post(`workouts/${workout_id}/days/${day_id}/exercises`, form)
            
            router.push({
                name: 'daysExercises.index',
                params: { 
                    workout_id: workout_id,
                    day_id: day_id 
                }
            })
        } catch (e) {
            console.log(e)
            if(e && e.response && e.response.data && e.response.data.errors) {
                errors.value = e.response.data.errors
            }
        }
    }

    const getDayExercise = async (workout_id, day_id, id) => {
        const response = await axios.get(`workouts/${workout_id}/days/${id}`)
        dayExercise.value = await response.data
    }

    const updateDayExercise = async (workout_id, id, form) => {
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

    const deleteDayExercise = async (workout_id, id) => {
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

    return { daysExercises, getDaysExercises, addDayExercise, errors, getDayExercise, dayExercise, updateDayExercise, deleteDayExercise }
}