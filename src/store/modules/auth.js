import api from '../../api';

const state = {
    token: window.localStorage.getItem('pet_clicker_token'),
    current_user: JSON.parse(window.localStorage.getItem('current_user') || '{}'),
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
        commit('setToken', data.token)
        window.localStorage.setItem('pet_clicker_token', data.token)
        window.localStorage.setItem('current_user', JSON.stringify(data.user))
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

