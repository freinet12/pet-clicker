import api from '../../api'
import { AES } from 'crypto-js'
import UTF8 from 'crypto-js/enc-utf8'
const cryptoKey = process.env.VUE_APP_CRYPTO_KEY || ''

function getUserFromLocalStorage() {
    const user = window.localStorage.getItem('current_user')
    if(!user) return null
    
    return JSON.parse(AES.decrypt(user, cryptoKey).toString(UTF8))
}

function getUserTokenFromLocalStorage(){
    const token = window.localStorage.getItem('pet_clicker_token')
    if (!token) return null

    return AES.decrypt(token, cryptoKey).toString(UTF8)
}

const state = {
    token: getUserTokenFromLocalStorage(),
    current_user: getUserFromLocalStorage()
};

const getters = {
    isLoggedIn: state => !!state.token,
    currentUser: state => state.current_user,
};

const actions = {
    login: async ({ commit }, data) => {
       return await api.login(data.email, data.password);
    },

    register: async({ commit }, data) => {
        return await api.register(data)
    },

    finalizeLogin: ({ commit }, data) => {
        const userToken = AES.encrypt(data.token, cryptoKey).toString()
        const encryptedUser = AES.encrypt(JSON.stringify(data.user), cryptoKey).toString()
        commit('setToken', data.token)
        window.localStorage.setItem('pet_clicker_token', userToken)
        window.localStorage.setItem('current_user', encryptedUser)
        commit('setUser', data.user)

        window.location = '/home/gallery'
    },

    logout: async ({ commit }) => {
        const response = await api.logout()
        console.log(response)
        commit('setToken', null);
        window.localStorage.removeItem('pet_clicker_token');
        window.localStorage.removeItem('current_user')
        window.location = '/auth/login'
    },

    
};

const mutations = {
    setToken: (state, token) => {
        state.token = token;
    },
    setUser: (state, user) => {
        state.current_user = user
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};

