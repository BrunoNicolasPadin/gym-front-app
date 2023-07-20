import { ref } from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api'

export default function useLovs() {
    const lovs = ref([])

    const getLovs = async (page = 1, search = '', filter = 'label') => {
        console.log(search);
        const response = await axios.get(`/lovs/?page=${page}&filter[${filter}]=${search}`)
        lovs.value = await response.data;
    }

    return { lovs, getLovs }
}