//importing instruments
import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import baseApi from '../baseApi'

Vue.use(Router)

//importing components
import Login from "../components/Login";
import Register from "../components/Register";
import Home from "../components/Home";
import Tab1 from "../components/Tab1";
import Tab2 from "../components/Tab2";
import Tab3 from "../components/Tab3";
import notFound from "../components/notFound";
import permissionDenied from "../components/permissionDenied";


const Middleware = () => {
    return (to, from, next) => {
        const myRole = store.getters.GET_AUTH_USER.role
        const auth = store.getters.GET_AUTH
        const isRequiredAuth = to.matched.some(r => r.meta.requiredAuth)
        const hasRoles = to.matched.some(r => r.meta.userRoles)
        if(isRequiredAuth && auth === false){
            if(from.fullPath === "/login"){
                return next(false)
            }
            else{
                return next({name: "Login"})

            }

        }
        if(hasRoles){
            let arrayRoles = to.meta.userRoles
            if(arrayRoles.indexOf(parseInt(myRole)) < 0){
                return next({name: "permissionDenied"})
            }
        }
        next()
    }

}

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/home',
            name: 'Home',
            component: Home
        },
        {
            path: '/tab1',
            name: 'Tab1',
            component: Tab1
        },
        {
            path: '/tab2',
            name: 'Tab2',
            component: Tab2,
            meta: {
                requiredAuth: true,
                userRoles: [1, 3]
            },
            beforeEnter: Middleware()
        },
        {
            path: '/tab3',
            name: 'Tab3',
            component: Tab3
        },
        {
            path: '*',
            name: 'notFound',
            component: notFound
        },
        {
            path: '/permissionDenied',
            name: 'permissionDenied',
            component: permissionDenied
        },

    ]
})
