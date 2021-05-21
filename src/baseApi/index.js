import axios from 'axios'

let baseApi = axios.create({
    baseURL : 'http://lumen.pro/api'
});

const Api = function(){
    let token = localStorage.getItem('token')
    if(token){
        baseApi.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    return baseApi;
}

export default Api
