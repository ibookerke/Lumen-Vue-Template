import baseApi from '../baseApi'
import router from '../router'
import store from '../store'

const LOGIN_URL = '/login';
const LOGOUT_URL = '/logout';
const REG_URL = '/register';

export default ({
    userDefault:{
        id:'',
        name:'',
        email:'',
        role:'',
        token: ''
    },
    Login: async (cred, redirect) => {
        try{
            baseApi().post(LOGIN_URL, cred).then( (response) => {
                if (response.data.status === 200){
                    store.dispatch('SET_AUTH_USER', response.data.user.user)
                    store.dispatch('SET_TOKEN', response.data.user.token)
                    store.dispatch('SET_AUTH', true)
                    localStorage.setItem('token', response.data.user.token.value)
                    router.push(redirect)
                }
                return response.data
            })
        }
        catch(err) { return { "status" : "failed", "message" : err.message }}
    },
    Register: async (cred) => {
        try{
            baseApi().post(REG_URL, cred).then( (response) => {
                return response.data
            })
        }
        catch(err) { return { "status" : "failed", "message" : err.message }}
    },
    async Logout(){
        try{
            baseApi().post(LOGOUT_URL).then( (response) => {
                if(response.data.status === 200){
                    this.storageCleaner()
                    if(router.history.current.path !== "/home"){
                        router.push("/home")
                    }
                }
            })
        }
        catch(err) { return { "status" : "failed", "message" : err.message }}

    },
    async authCheck() {
        try{
            await baseApi().get('/user').then( (response) => {
                if(response.data.status === 200){
                    store.dispatch('SET_AUTH_USER', response.data.user.user)
                    store.dispatch('SET_TOKEN', response.data.user.token)
                    store.dispatch('SET_AUTH', true)
                    localStorage.setItem('token', response.data.user.token.value)
                }
            })
        }
        catch(err) { return { "status" : "failed", "message" : err.message }}
    },

    storageCleaner(){
        store.dispatch("SET_AUTH_USER", this.userDefault)
        store.dispatch("SET_TOKEN", '')
        store.dispatch("SET_AUTH", false)
        localStorage.removeItem('token')
    }
});
