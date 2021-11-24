<template>
    <section class="login-section">
        <div class="main-wrapper">
            <div class="min-h-screen flex items-center justify-center">
                <div class="max-w-lg w-full space-y-8" v-if="showLoginForm">
                    <div class="pb-24 pt-2 lg:pt-4  px-2 sm:px-6 lg:px-8">
                        <div class="pb-4">
                            <div class="flex justify-center">
                                <Logo textClasses="text-gray-300 py-3 font-semibold text-2xl pr-2"/>
                            </div>
                            <h2 class="text-center text-xs text-indigo-600 font-semibold uppercase">
                                Welcome back
                            </h2>
                            <h2 class="text-center text-base pt-4 font-semibold text-indigo-600">
                                Log In to Your Account
                            </h2>
                        </div>

                        <div class="px-3 bg-white md:px-6 pt-1 pb-8 rounded-lg shadow-md mt-2">
                            <div class="flex space-x-4 bg-red-100 border-1 border-red-200 text-red-600 font-medium rounded p-2 mt-2 text-sm" 
                                v-if="badCredentials">
                                <span class="text-red-600">
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        class="h-5 w-5" 
                                        viewBox="0 0 20 20" 
                                        fill="currentColor">
                                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                                    </svg>
                                </span>
                                <p>
                                    Invalid email or password.
                                </p>
                                
                            </div>
                            <form class="mt-4 space-y-6" @submit.prevent="loginUser" autocomplete="off">
                                <!-- Email -->
                                <div class="">
                                    <div class="">
                                        <label for="email" class="block text-base font-medium text-gray-700">Email</label>
                                        <input
                                            autocomplete="false"
                                            v-model="loginForm.email"
                                            required
                                            type="text" 
                                            id="email" 
                                            class="mt-1 focus:outline-none focus:ring-1  focus:ring-indigo-600 block w-full sm:text-sm border-gray-300 rounded-md px-4 border-1 focus:border-white py-2 md:py-3">
                                    </div>
                                </div>
                                <!-- Password -->
                                <div class="">
                                    <div class="">
                                        <label for="login_password" class="block text-base font-medium text-gray-700">Password</label>
                                        <input
                                            autocomplete="false"
                                            v-model="loginForm.password"
                                            required
                                            type="password" 
                                            id="login_password" 
                                            class="mt-1 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-indigo-600 block w-full sm:text-sm border-gray-300 rounded-md py-2 md:py-3 px-4 border-1 focus:border-white">
                                    </div>
                                </div>
                            
                                <div>
                                    <button 
                                        type="submit" 
                                        class="login-btn group relative w-full flex justify-center py-2 px-4 border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                                        :disabled="loggingIn"
                                        :class="{'cursor-not-allowed' : loggingIn}">
                                        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                                            <!-- Heroicon name: lock-closed -->
                                            <svg class="h-5 w-5 text-white group-hover:text-gray-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                                            </svg>
                                        </span>
                                        <span class="text-base" v-if="!loggingIn">
                                            Log In
                                        </span>
                                        <span class="text-base flex" v-else>
                                        <Spinner class="my-auto"/>
                                            Logging in...
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                        <p class="mt-4 text-center pr-4 text-md text-gray-300">
                            Don't have an account? <br>
                            <router-link to="/auth/register" class="text-indigo-600 hover:text-indigo-500 font-medium">
                                Sign Up
                            </router-link>
                        </p>
                        
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-wrapper">
        </div>
    </section>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import Spinner from '@/components/utils/SpinnerUtil'
    import Logo from '@/components/Logo.vue'

    export default {
        name: 'Login',
        metaInfo: {
        title: 'Login | Pet Clicker',
        meta: [
            {
                name: 'description',
                content: ''
            }
        ]
    },
        components: {
            Spinner,
            Logo
        },
        
        data(){
            return {
                loginForm: {
                    email: '',
                    password: ''
                },

                errors:{
                    email: '',
                    password: ''
                },

                loggingIn: false,
                badCredentials: false,
                showLoginForm: true,
            }
        },

        computed: {
            ...mapGetters(['isLoggedIn']),
        },

        created(){
            window.scrollTo(0, 0);
            
        },

        mounted(){
            this.checkIfLoggedIn();
        },

        methods: {
            checkIfLoggedIn(){
                if (this.isLoggedIn){
                    return window.location = `/home/gallery`; 
                }
            },

            async loginUser(){
                try{
                    this.loggingIn = true

                    const response = await this.login({
                        email: this.loginForm.email, 
                        password: this.loginForm.password
                    })
                    this.loggingIn = false

                    if (response.data.success){
                        this.showLoginForm = false
                        this.badCredentials = false
                        this.loginForm.email = ''
                        this.loginForm.password = ''
                        this.errors.email = ''
                        this.errors.password = ''
                       this.finalizeLogin(response.data)
                    } else {
                        console.log(response.data)
                    }
                  
                } catch( error ){
                    this.loggingIn = false
                    this.showLoginForm = true
                    if (error.response.data.message = 'The given data was invalid.'){
                        this.badCredentials = true
                    }
                    const errors = error.response.data.errors
                    if (errors.email){
                        this.errors.email = errors.email[0]
                    }

                    if(errors.password){
                        this.errors.password = errors.password[0]
                    }
                }
               
            },
            ...mapActions(['login', 'finalizeLogin'])
        }
    }
</script>

<style scoped>
    .login-section{
        background: url('../../assets/images/collage.jpg');
    }

    .main-wrapper{
        background: rgb(0, 0, 0, 0.85);
    }
</style>