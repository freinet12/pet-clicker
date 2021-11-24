<template>
    <section class="fixed z-30">
        <div class="flex justify-between w-screen px-4 lg:px-10 py-0 bg-white border-gray-200 shadow-md">
            <router-link
                class="item" 
                :to="{'/auth/login' : !isLoggedIn, '/home/gallery' : isLoggedIn}">
                <Logo textClasses="text-gray-600 py-4 lg:py-3 font-semibold text-sm lg:text-lg" :forNavBar="true"/>
            </router-link>
            
            <div class="my-auto space-x-10 hidden lg:inline-block">
                <router-link
                    active-class="bg-gray-50 border-b-4 border-indigo-500 rounded-t-lg rounded-b-none shadow-inner"
                    to="/home/gallery" 
                    class="px-4 py-3  rounded-lg hover:bg-gray-50">
                    Gallery
                </router-link>

                <router-link
                    active-class="bg-gray-50 py-3 border-b-4 border-indigo-500 rounded-t-lg rounded-b-none shadow-inner"
                    to="/home/my-images" 
                    class="px-4 py-3 rounded-lg hover:bg-gray-50">
                    My Images
                </router-link>

                <router-link
                    active-class="bg-gray-50 py-3 border-b-4 border-indigo-500 rounded-t-lg rounded-b-none shadow-inner"
                    to="/home/upload" 
                    class="px-4 py-3 rounded-lg hover:bg-gray-50">
                    Upload
                </router-link>
            </div>
            <div class="my-auto hidden lg:inline-block">
                <div class="my-auto flex justify-between space-x-8">
                    <div class="space-x-2 flex">
                        <span>
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                class="h-6 w-6" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </span>
                        <span>
                            {{currentUser.name}}
                        </span>
                    
                    </div>
                    <div class="border-2 border-gray-200 bg-gray-200 rounded-full"></div>
                    <div class="rounded-lg hover:bg-gray-50">
                        <a class="cursor-pointer " @click="logout">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                class="h-6 w-6" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            <div class="my-auto lg:hidden">
                <button class="mt-1" @click="showMobileMenu = !showMobileMenu">
                    <svg
                        v-if="!showMobileMenu"
                        xmlns="http://www.w3.org/2000/svg" 
                        class="h-6 w-6" fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <svg 
                        v-else
                        xmlns="http://www.w3.org/2000/svg" 
                        class="h-6 w-6" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button> 
            </div>
        </div>
        <div class="border-t-2 border-b-2 border-gray-300 bg-gray-50 shadow-xl lg:hidden" v-if="showMobileMenu">
            <div class="my-auto">
                <router-link
                    active-class="bg-gray-200 border-b-2 border-gray-300"
                    to="/home/gallery" 
                    class="px-4 py-3 block">
                    Gallery
                </router-link>

                <router-link
                    active-class="bg-gray-200 border-t-2 border-b-2 border-gray-300"
                    to="/home/my-images" 
                    class="px-4 py-3 block">
                    My Images
                </router-link>

                <router-link
                    active-class="bg-gray-200 border-t-2 border-b-2 border-gray-300"
                    to="/home/upload" 
                    class="px-4 py-3 block">
                    Upload
                </router-link>
            </div>
        </div>
    </section>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import Logo from '@/components/Logo.vue'
    export default {
        name: 'Navbar',
        components: {
            Logo
        },
        data(){
            return {
                showMobileMenu: false
            }
        },
        computed: mapGetters(['isLoggedIn', 'currentUser']),
        methods: {
            ...mapActions(['logout'])
        }
    }
</script>

<style scoped>
    .horizontal{
        display: flex;
        flex-direction: row;
    }
    .menu{
        border-radius: 0!important;
    }
</style>