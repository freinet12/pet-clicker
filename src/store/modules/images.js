import api from '../../api';

const state = {
    myImages: [],
    allImages: [],
    isFetchingMyImages: false,
    isFetchingAllImages: false

};

const getters = {
    currentUserImages: state => state.myImages,
    allUserImages: state => state.allImages,
    isFetchingAllImages: state => state.isFetchingAllImages,
    isFetchingMyImages: state => state.isFetchingMyImages
};

const actions = {
    getMyImages: async ({ commit }) => {
        commit('toggleFetchingMyImages', true)
        const response = await api.getMyImages()
        commit('toggleFetchingMyImages', false)
        commit('setMyImages', response.data.images)
    },

    getAllImages: async ({ commit }) => {
        commit('toggleFetchingAllImages', true)
        const response = await api.getAllImages()
        commit('toggleFetchingAllImages', false)
        commit('setAllImages', response.data.images)
    },

    likeImage: async ({ commit }, imageId) => {
        return await api.likeImage(imageId)
        
    },

    unlikeImage: async ({ commit }, imageId) => {
        return await api.dislikeImage(imageId)
    },

    uploadImages: async({ commit }, image) => {
        return await api.uploadImage(image)
    }
};

const mutations = {
    setMyImages: (state, images) => {
        state.myImages = images
    },
    setAllImages: (state, images) => {
        state.allImages = images
    },
    toggleFetchingMyImages: (state, value) => {
        state.isFetchingMyImages = value
    },
    toggleFetchingAllImages: (state, value) => {
        state.isFetchingAllImages = value
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};