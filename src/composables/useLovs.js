import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api'

export default function useLovs() {
    const router = useRouter()
    const route = useRoute()
    const lovs = ref([])
    const errors = ref({})

    const getLovs = async (page = 1, search = '', filter = 'label') => {
        const response = await axios.get(`/lovs/?page=${page}&filter[${filter}]=${search}`)
        lovs.value = await response.data;
    }

    const addLov = async (form) => {
        try {
            await axios.post('/lovs', form)
            
            router.push({
                name: 'lovs.index',
            })
        } catch (e) {
            if(e && e.response && e.response.data && e.response.data.errors) {
                errors.value = e.response.data.errors
            }
        }
    }

    return { lovs, getLovs, addLov, errors }
}