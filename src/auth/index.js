import baseApi from '../baseApi'
import router from '../router'

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
        baseApi().post(LOGIN_URL, cred).then( (response) => {
            console.log(response.data)
        })
    },
    Register: async (cred, redirect) => {
        baseApi().post(REG_URL, cred).then( (response) => {

        })
    },
    Logout: async (cred, redirect) => {
        baseApi().post(LOGOUT_URL).then( (response) => {

        })
    },


});
