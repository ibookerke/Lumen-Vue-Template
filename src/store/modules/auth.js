const auth = ({
    state: {
        User:{
            'id' : '',
            'name': '',
            'email': '',
            'role': '',
        },
        token: {
            "value": '',
            "type": '',
            "expired_at": '',
        },
        authenticated: false
    },
    mutations :{
        SET_AUTH_USER: (state, data) => {
            state.user = data
        },
        SET_TOKEN: (state, token ) => {
            state.token = token
        },
        SET_AUTH: (state, auth) => {
            state.authenticated = auth
        }
    },
    actions: {
        SET_AUTH_USER: ({commit}, data) => {
            commit('SET_AUTH_USER', data)
        },
        SET_TOKEN: ({commit}, token ) => {
            commit('SET_TOKEN', token)
        },
        SET_AUTH: ({commit}, auth) => {
            commit('SET_AUTH', auth)
        }
    },
    getters : {
        SET_AUTH_USER: state => state.user,
        SET_TOKEN: state => state.token,
        SET_AUTH: state => state.authenticated,
    }
})

export default auth
