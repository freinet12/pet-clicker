import qs from 'qs';
import axios from 'axios';
import { AES } from 'crypto-js'
import UTF8 from 'crypto-js/enc-utf8'
const cryptoKey = process.env.VUE_APP_CRYPTO_KEY || ''
const BASE_URL = process.env.VUE_APP_PET_CLICKER_API_URL;
const encryptedToken = window.localStorage.getItem('pet_clicker_token') || null
const ACCESS_TOKEN =  encryptedToken ? AES.decrypt(encryptedToken, cryptoKey).toString(UTF8) : null

export default {
    async register(formData = {}){
        return await axios.post(`${BASE_URL}/auth/register`, formData)
    },

    async login(email, password){
        return await axios.post(`${BASE_URL}/auth/login`, {
            email,
            password
        })

    },

    async logout(){
        return await axios.post(`${BASE_URL}/auth/logout`, {},{
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`
            }
        })
    },

    async getMyImages(){
        return await axios.get(`${BASE_URL}/pet-images/me`, {
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`
            }
        })
    },

    async getAllImages(){
        return await axios.get(`${BASE_URL}/pet-images`, {
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`
            }
        })
    },

    async uploadImage(image){
        const formData = new FormData()
        formData.append('image', image)

        return await axios.post(`${BASE_URL}/pet-images/upload`, formData, {
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`
            } 
        })

    },

    async likeImage(imageId){
        return await axios.post(`${BASE_URL}/pet-images/${imageId}/like`, {},{
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`
            }
        })
    },

    async dislikeImage(imageId){
        return await axios.delete(`${BASE_URL}/pet-images/likes/${imageId}`, {
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`
            }
        })
    }

    // uploadImage(images){

    //     let acceptableImages = Array.from(images).filter(image => {
    //        let validExtentions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'raw' ];

    //        return validExtentions.includes(image.name.split('.').pop()); 
    //     });

    //     const promises = Array.from(acceptableImages).map(image => {
    //         const formData = new FormData();
    //         formData.append('image', image);
    //         return axios.post(`${BASE_URL}/3/image`, formData, {
    //             headers: {
    //                 Authorization: `Bearer ${accessToken}`
    //             }
    //         })
    //     })

    //     return Promise.all(promises);
    // }
}