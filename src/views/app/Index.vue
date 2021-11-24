<template>
    <section class="overflow-x-hidden">
        <Navbar />
        <main class="mt-14">
            <router-view></router-view>
        </main>
    </section>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import Navbar from '@/components/Navbar.vue'

    export default {
        name: 'AppIndex',
        components: {
            Navbar
        },

        data(){
            return {
            
            }
        },

        computed: {
            ...mapGetters(['currentUser']),
            
            ...mapGetters(['isLoggedIn']),
            
        },

        created(){
            this.checkIfAuthenticated()

        },

        mounted(){
        },

     
        methods: {
            async checkIfAuthenticated(){
                if (!this.isLoggedIn){
                    window.location = '/auth/login'
                } else {
                    this.getAllImages()
                    this.getMyImages()
                }
            },

           ...mapActions(['logout', 'getAllImages', 'getMyImages']),
        }
    }
</script>

<style scoped>
   
</style>