import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from "axios";
import auth from "./auth"

//boostrap + jquery
import 'bootstrap-vue'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/css/bootstrap.min.css'

auth.authCheck()

Vue.config.productionTip = false

/* eslint-disable no-new */
const app = new Vue({
    el: '#app',
    data: {isLoading: false},
    router,
    store,
    components: { App },
    template: '<App/>'
})

let timeout = ''
router.beforeEach( (to, from, next) =>  {
    clearInterval(timeout)
    app.isLoading = true
    next()
})

router.afterEach( (to, from, next) =>  {
    timeout = setTimeout( () => {
        app.isLoading = false
    }, 200)
})
