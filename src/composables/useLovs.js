import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000/api'

export default function useLovs() {
    const router = useRouter()
    const lovs = ref([])
    const lov = ref([])
    const errors = ref({})
    const currentPage = ref(1)

    const getLovs = async (page = 1, search = '', filter = 'label') => {
        currentPage.value = page
        const response = await axios.get(`/lovs?page=${page}&filter[${filter}]=${search}`)
        lovs.value = await response.data;
    }

    const addLov = async (form) => {
        try {
            await axios.post('/lovs', form)
            
            router.push({
                name: 'lovs.index',
            })
        } catch (e) {
            console.log(e)
            if(e && e.response && e.response.data && e.response.data.errors) {
                errors.value = e.response.data.errors
            }
        }
    }

    const getLov = async (id) => {
        const response = await axios.get(`/lovs/${id}`)
        lov.value = await response.data;
    }

    const updateLov = async (id, form) => {
        try {
            await axios.post(`lovs/${id}`, form)
            
            router.push({
                name: 'lovs.index',
            })
        } catch (e) {
            console.log(e)
            if(e && e.response && e.response.data && e.response.data.errors) {
                errors.value = e.response.data.errors
            }
        }
    }

    const deleteLov = async (id) => {
        try {
            await axios.post(`/lovs/${id}`, {_method: 'delete'})
            getLovs(1)
        } catch (e) {
            console.log(e)
            if(e && e.response && e.response.data && e.response.data.errors) {
                errors.value = e.response.data.errors
            }
        }
    }

    const getLovsWithoutPaginate = async (search = '', filter = 'category') => {
        const response = await axios.get(`/lovs-for-category?filter[${filter}]=${search}`)
        lovs.value = await response.data;
    }

    return { lovs, getLovs, currentPage, addLov, errors, getLov, lov, updateLov, deleteLov, getLovsWithoutPaginate }
}