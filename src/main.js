import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios";

//boostrap + jquery
import 'bootstrap-vue'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/css/bootstrap.min.css'


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
