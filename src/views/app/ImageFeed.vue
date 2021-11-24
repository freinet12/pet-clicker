<template>
    <section class="bg-gray-10 h-screen w-screen">
        <GallerySpinner v-if="isFetchingAllImages && !allUserImages.length"/>
        <ImageGallery :images="allUserImages"/>
       
    </section>
</template>

<script>
import {mapGetters} from 'vuex'
import GallerySpinner from '@/components/GallerySpinner.vue'
import ImageGallery from '@/components/ImageGallery.vue'
export default {
    name: 'ImageFeed',
    components: {
        GallerySpinner,
        ImageGallery
    },
    data(){
        return {

        }
    },

    computed:{ 
        ...mapGetters(['allUserImages', 'isFetchingAllImages', 'currentUser'])
    },

    

    
}
</script>

<style>

</style>