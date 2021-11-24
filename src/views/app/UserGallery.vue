<template>
    <section class="bg-gray-50 h-screen w-screen">
        <GallerySpinner v-if="isFetchingMyImages && !currentUserImages.length"/>
        <ImageGallery :images="currentUserImages"/>
        <div v-if="!isFetchingMyImages && !currentUserImages.length" class="flex">
            <div class="mx-auto bg-indigo-100 px-10 py-6 rounded-lg">
                You have no uploaded images.
            </div>
            
        </div>
    </section>
</template>

<script>
import {mapGetters} from 'vuex'
import GallerySpinner from '@/components/GallerySpinner.vue'
import ImageGallery from '@/components/ImageGallery.vue'
export default {
    name: 'UserGallery',
    components: {
        GallerySpinner,
        ImageGallery
    },
    data(){
        return {

        }
    },

    computed:{ 
        ...mapGetters(['currentUserImages', 'isFetchingMyImages', 'currentUser'])
    },

}
</script>

<style>

</style>