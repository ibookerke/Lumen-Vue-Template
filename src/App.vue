<template>
    <div id="app">
        <div style="margin:auto; margin-top:1em;">
            <div style="width:100%; padding: .5em; border-bottom: 1px solid #dedede; display:flex;">
                <ul>
                    <li><router-link :to="{name: 'Home'}">Home</router-link></li>
                    <li><router-link :to="{name: 'Tab1'}">Tab 1</router-link></li>
                    <li><router-link :to="{name: 'Tab2'}">Tab 2</router-link></li>
                    <li><router-link :to="{name: 'Tab3'}">Tab 3</router-link></li>
                </ul>
                <ul v-if="!isAuth" style="margin-left:auto;">
                    <li><router-link to="/login" class="btn-custom btn-custom-primary">Login</router-link></li>
                    <li><router-link to="/register" class="btn-custom">Register</router-link></li>
                </ul>
                <ul v-else style="margin-left:auto;">
                    <li >Role {{user.role + "-" + user.name}}</li>
                    <li><a href="javascript:void(0)" @click="logout">Logout</a></li>
                </ul>
            </div>
            <h4 v-if="$root.isLoading">Loading...</h4>
            <router-view v-else/>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import auth from "./auth";

export default {
    name: 'App',
    computed: {
        ...mapGetters({
            isAuth: 'GET_AUTH',
            user: "GET_AUTH_USER"
        })
    },
    methods: {
         logout() {
             auth.Logout()
         }
    }
}
</script>

<style>
body{ font-size: 12px; }
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
ul{
    padding:0;
    margin:0;
    list-style-type: none;
}
ul li {
    margin:0;
    padding:0;
    display: inline-block;
}

a{
    text-decoration:none;
    display:block;
    padding:.5em 1.5em;
}
a:hover{
    background: #f1f1f1;
}
.btn-custom{
    border-radius: 5px;
    border: 1px solid royalblue;
}

.btn-custom-primary{
    background: royalblue;
    color: #f1f1f1;
}

.btn-custom-primary:hover{
    color: royalblue;
}

</style>
