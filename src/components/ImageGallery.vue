<template>
    <div 
        class="px-3 py-3 mb-14 space-y-4 md:space-y-0 md:py-10 md:grid md:gap-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 md:px-10">
        <div 
            v-for="image in images" 
            :key="`img-${image.id}`"
            class="bg-white h-96 rounded-b-lg shadow-lg hover:shadow-xl"
            >
            <img
                :src="image.url" 
                class="w-full object-cover h-80 rounded-t-lg cursor-pointer"
            >
            <div class="px-2 py-2 flex justify-between">
                <div class="flex py-3 px-2 cursor-pointer" @click="toggleLikes(image)">
                    <span class="my-auto">
                        <svg
                            v-if="userLikesPicture(image) == true" 
                            xmlns="http://www.w3.org/2000/svg" 
                            class="h-4 w-4 text-red-500" 
                            viewBox="0 0 20 20" 
                            fill="currentColor">
                            <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                        </svg>
                        <svg
                            v-else
                            xmlns="http://www.w3.org/2000/svg" 
                            class="h-4 w-4 text-red-500" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        
                    </span>
                    <span class="my-auto text-sm pl-1">
                        {{image.likes.length.toLocaleString()}} {{image.likes.length !== 1 ? 'Likes' : 'like'}}
                    </span>
                </div>
                <div class="flex py-3 px-2">
                    <span class="my-auto">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            class="h-4 w-4 text-indigo-800" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </span>
                    <span class="text-xs my-auto">
                        {{image.user.name}}
                    </span> 
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'ImageGallery',
    props: {
        images: {
            type: Array,
            required: true
        }
    },

    data(){
        return {

        }
    },

    computed: {
        ...mapGetters(['currentUser'])
    },

    methods: {
        userLikesPicture(image){
            const userLikes = image.likes.filter(like => like.user_id === this.currentUser.id)
            if (userLikes.length) return true
            return false
        },

        async toggleLikes(image){
            if( this.userLikesPicture(image) ){
                let response = await this.unlikeImage(image.id)
                if (response.data.success){
                    this.getAllImages()
                    this.getMyImages()
                }

            } else {
                let response = await this.likeImage(image.id)
                if (response.data.success){
                    this.getAllImages()
                    this.getMyImages()
                }
            }
        },

        ...mapActions(['unlikeImage', 'likeImage', 'getAllImages', 'getMyImages'])
    }
}
</script>

<style>

</style>