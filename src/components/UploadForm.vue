<template>
    <section class="px-4 mt-20 lg:mx-48 lg:mt-32">
        <div class="wrapper mt-14 border-2 border-dashed border-black rounded-xl p-4">
            <input 
                type="file" 
                @change="prepareForUpload($event.target.files)"
                accept="image/*">
            <p v-if="!selectedFile">
                Drag & Drop 
            </p>
            <p v-else>
                <span class="font-semibold">Selected File:</span> {{selectedFile.name}}
            </p>
        </div>
        <div class="my-4 flex justify-end">
            <button
                @click="handleUpload"
                :disabled="isUploading || !selectedFile"
                class="flex text-base bg-indigo-600 hover:bg-indigo-700 rounded-md px-2 py-2 text-white"
                :class="{'cursor-not-allowed' : (isUploading || !selectedFile)}">
                <span class="my-auto" v-if="!isUploading">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        class="h-5 w-5" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                </span>
                <span class="my-auto px-2" v-if="!isUploading">
                    Upload
                </span>
                <span class="text-base flex" v-if="isUploading">
                    <Spinner class="my-auto"/>
                    Uploading...
                </span>
            </button>
        </div>
    </section>
</template>

<script>
import { mapActions } from 'vuex'
import Spinner from '@/components/utils/SpinnerUtil'
export default {
    name: "UploadForm",
    components: {
        Spinner
    },
    
    data(){
        return {
            selectedFile: null,
            isUploading: false
        }
    },

    methods: {
        prepareForUpload(fileList){
            this.selectedFile = fileList[0]
        },

        async handleUpload(){
            if(!this.selectedFile){
               return alert('Please select a file to upload!')
            }
            try {
                this.isUploading = true
                const response = await this.uploadImages(this.selectedFile)
                if (response.data.success){
                    this.selectedFile = null
                    this.getMyImages()
                    this.getAllImages()
                    this.isUploading = false
                    
                
                } else {
                    this.isUploading = false
                
                }
            } catch( error ){
                this.isUploading = false
               
            } 
        },


        ...mapActions(['uploadImages', 'getMyImages', 'getAllImages'])
    }
}
</script>

<style scoped>
    .wrapper{
        height: 30vh;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    .wrapper input{
        width: 100%;
        height: 30vh;
        position: absolute;
        border-radius: 10px;
        opacity: 0;
    }

    .wrapper:hover{
        background-color: #eee;
        cursor: pointer;
    }  
    
    
</style>