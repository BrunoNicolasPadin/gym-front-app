import { defineStore } from 'pinia';
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

axios.defaults.withCredentials = true

export const useUserStore = defineStore('auth', () => {
    const user = ref(JSON.parse(localStorage.getItem('user')))
    const auth = ref(localStorage.getItem('auth'))
    const errors = ref({})
    const router = useRouter()

    const register = async (form) => {
        try {
            await axios.get('http://localhost:8000/sanctum/csrf-cookie');
            const response = await axios.post('http://localhost:8000/api/register', form)
            const userData = await response.data;
            if (userData !== null) {
                user.value = userData
                auth.value = true

                localStorage.setItem('user', JSON.stringify(user.value));
                localStorage.setItem('auth', auth.value);
                
                router.push({
                    name: 'lovs.index',
                })
            }
        } catch (e) {
            console.log(e)
            if(e && e.response && e.response.data && e.response.data.errors) {
                errors.value = e.response.data.errors
            }
        }
    }

    const login = async (form) => {
        try {
            await axios.get('http://localhost:8000/sanctum/csrf-cookie');
            const response = await axios.post('http://localhost:8000/api/login', form)
            const userData = await response.data;
            if (userData !== null) {
                user.value = userData
                auth.value = true

                localStorage.setItem('user', JSON.stringify(user.value));
                localStorage.setItem('auth', auth.value);
                
                router.push({
                    name: 'lovs.index',
                })
            }
        } catch (e) {
            console.log(e)
            if(e && e.response && e.response.data && e.response.data.errors) {
                errors.value = e.response.data.errors
            }
        }
    }

    const logout = async () => {
        try {
            await axios.get('http://localhost:8000/sanctum/csrf-cookie');
            const response = await axios.post('http://localhost:8000/api/logout')
            user.value = ''
            auth.value = false

            localStorage.removeItem('user');
            localStorage.removeItem('auth');
            
            router.push({
                name: 'login',
            })
        } catch (e) {
            console.log(e)
            if(e && e.response && e.response.data && e.response.data.errors) {
                errors.value = e.response.data.errors
            }
        }
    }
  
    return { register, errors, user, auth, login, logout }
})