import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000/api'

export default function useExercises() {
    const router = useRouter()
    const exercises = ref([])
    const exercise = ref([])
    const errors = ref({})

    const getExercises = async (page = 1, search = '', filter = 'name') => {
        const response = await axios.get(`/exercises?page=${page}&filter[${filter}]=${search}`)
        exercises.value = await response.data
    }

    const addExercise = async (form) => {
        try {
            await axios.post('/exercises', form)
            
            router.push({
                name: 'exercises.index',
            })
        } catch (e) {
            console.log(e)
            if(e && e.response && e.response.data && e.response.data.errors) {
                errors.value = e.response.data.errors
            }
        }
    }

    const getExercise = async (id) => {
        const response = await axios.get(`/exercises/${id}`)
        exercise.value = await response.data
    }

    const updateExercise = async (id, form) => {
        try {
            await axios.post(`exercises/${id}`, form)
            
            router.push({
                name: 'exercises.index',
            })
        } catch (e) {
            console.log(e)
            if(e && e.response && e.response.data && e.response.data.errors) {
                errors.value = e.response.data.errors
            }
        }
    }

    const deleteExercise = async (id) => {
        try {
            await axios.post(`/exercises/${id}`, {_method: 'delete'})
            getExercises(1)
        } catch (e) {
            console.log(e)
            if(e && e.response && e.response.data && e.response.data.errors) {
                errors.value = e.response.data.errors
            }
        }
    }

    return { exercises, getExercises, addExercise, errors, getExercise, exercise, updateExercise, deleteExercise }
}