import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Login from "../components/Login";
import Register from "../components/Register";
import Home from "../components/Home";
import Tab1 from "../components/Tab1";
import Tab2 from "../components/Tab2";
import Tab3 from "../components/Tab3";

export default new Router({
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
            component: Tab2
        },
        {
            path: '/tab3',
            name: 'Tab3',
            component: Tab3
        },
    ]
})
