<template>
    <section class="register-section">
        <div class="main-wrapper">
            <div class="min-h-screen flex items-center justify-center">
                <div class="max-w-xl w-full space-y-8">
                    <div class="pb-24 pt-2 lg:pt-4  px-2 sm:px-6 lg:px-8">
                        <div class="md:mb-10">
                            <div class="flex justify-center">
                                <Logo textClasses="text-gray-300 py-3 font-semibold text-2xl pr-2"/>
                            </div>
                            
                            <h2 class="text-center text-md font-medium text-indigo-600 pb-4 relative bottom-2">
                                Create Your Account
                            </h2>
                            
                        </div>
                        <div class="bg-white p-4 rounded-lg shadow" v-if="accountCreated">
                                <h5 class="text-lg font-semibold text-center pb-4">Thank you for registering!</h5>
                                <p class="text-center">
                                    <router-link to="/auth/login" class="font-bold text-indigo-600 text-lg">Login</router-link> to access your account.
                                </p>
                                <!-- <p>We've sent a verification email to <span class="text-indigo-500 font-semibold">{{registeringEmail}}</span>  <br> <br>
                                    Please verify your email in order to finish setting up your account. <br>
                                    Didn't get the email? 
                                    <router-link to="/auth/verifyEmail" class="text-indigo-500 underline">Resend Verification Email. </router-link>
                                </p> -->
                            </div>
                        <div class="px-2 bg-white md:px-6 pt-2 pb-8 rounded-lg shadow-md" v-if="!accountCreated">
                            <p class="text-xs text-center relative top-2 text-indigo-600 font-medium">
                                All fields are required.
                            </p>
                            <div v-if="registrationFailed"
                                class="flex space-x-4 bg-red-100 my-4 py-2 px-2 rounded-md border-2 border-red-300">
                                <span class="text-red-600">
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        class="h-5 w-5" 
                                        viewBox="0 0 20 20" 
                                        fill="currentColor">
                                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                                    </svg>
                                </span>
                                <p class="text-sm text-red-600 font-medium">
                                    Unable to create account.
                                </p>
                            </div>
                         
                            <form 
                                autocomplete="off"
                                class="mt-8 space-y-6" 
                                @submit.prevent="registerUser">
                                <!-- Email -->
                                <div class="">
                                    <div class="">
                                        <label for="registration_email" class="block text-base font-medium text-gray-700">Email</label>
                                        <input
                                            @change="validateEmail"
                                            v-model="registrationForm.email"
                                            type="email"
                                            required
                                            id="registration_email"
                                            autocomplete="false"
                                            placeholder="Email Address"
                                            class="mt-1 focus:outline-none focus:ring-1  focus:ring-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md px-4 border-1 focus:border-white py-2 md:py-3">
                                    </div>
                                    <span class="text-xs text-red-500" v-if="validEmailFormat === false">
                                        Please enter a valid email address.
                                    </span>
                                    <span class="text-xs text-red-600 font-medium" v-if="errors.email">
                                        {{errors.email}}
                                    </span>
                                </div>
                                <!-- Name -->
                                <div class="">
                                    <div class="">
                                        <label for="register_full_name" class="block text-base font-medium text-gray-700">Full Name</label>
                                        <input
                                            v-model="registrationForm.name"
                                            type="text" 
                                            id="register_full_name"
                                            required
                                            placeholder="Full Name"
                                            class="mt-1 focus:outline-none focus:ring-1  focus:ring-indigo-600 block w-full sm:text-sm border-gray-300 rounded-md px-4 border-1 focus:border-white py-2 md:py-3">
                                    </div>
                                    <span class="text-xs text-red-500" v-if="errors.name">
                                        Please enter your Full Name
                                    </span>
                                </div>
                                <!-- Password -->
                                <div class="">
                                    <div class="">
                                        <label for="registration_password" class="block text-base font-medium text-gray-700">Password</label>
                                        <input
                                            v-model="registrationForm.password" 
                                            type="password" 
                                            id="registration_password"
                                            required
                                            autocomplete="off"
                                            placeholder="Password"
                                            class="mt-1 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 md:py-3 px-4 border-1 focus:border-white">
                                    </div>
                                    <span class="text-xs text-red-500" v-if="passwordValidLength === false">
                                        Password must have a minimum of 8 characters
                                    </span>
                                    <small v-if="registrationForm.password == ''">Mimimum 8 characters required.</small>
                                    <p class="text-xs text-red-500" v-if="errors.password">{{errors.password}}</p>
                                </div>
                                <!-- Confirm Password -->
                                <div class="">
                                    <div class="">
                                        <label for="registration_confirm_password" class="block text-base font-medium text-gray-700">Confirm Password</label>
                                        <input
                                            v-model="registrationForm.password_confirmation"
                                            type="password" 
                                            id="registration_confirm_password"
                                            placeholder="Confirm Password"
                                            required
                                            autocomplete="off"
                                            class="mt-1 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 md:py-3 px-4 border-1 focus:border-white">
                                    </div>
                                    <span class="text-xs text-red-500 font-medium" v-if="passwordsMatch === false">
                                        Passwords don't match.
                                    </span>
                                    <p class="text-sm text-red-600" v-if="errors.password_confirmationd">{{errors.password_confirmation}}</p>
                                </div>
                            
                                <div>
                                    <button
                                        :disabled="!enableSubmit"
                                        type="submit"
                                        :class="{'disabled:opacity50 cursor-not-allowed' : !enableSubmit}"
                                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                                        
                                        <span v-if="!registering">Create My Account</span>
                                        <span class="text-base flex" v-else>
                                        <Spinner class="my-auto"/>
                                            Creating account...
                                        </span>
                                    
                                    </button>
                                </div>
                                <div class="text-sm text-center">
                                    <span class="block">By signing up, you agree to our </span>
                                    <router-link to="#" class="text-indigo-500 font-semibold text-xs sm:text-sm"> Terms of Service </router-link> and 
                                    <router-link to="#" class="text-indigo-500 font-semibold text-xs sm:text-sm"> Privacy Policy </router-link>
                                </div>
                            </form>
                        </div>
                        <p class="mt-4 text-center text-md text-gray-400">
                            Already have an account? <br>
                            <router-link to="/auth/login" class="font-medium text-indigo-600 hover:text-indigo-500">
                                Log In
                            </router-link>
                        </p>
                    </div>
                </div>
            </div>  
        </div>
    </section>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import Spinner from '@/components/utils/SpinnerUtil.vue'
    import EmailValidator from 'email-validator'
    import Logo from '@/components/Logo.vue'

    export default {
        name: 'Register',
        metaInfo: {
            title: 'Register | Pet Clicker',
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
                registrationForm: {
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: ''
                },

                errors: {
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                },

                accountCreated: false,

                registeringEmail: null,

                registering: false,
                registrationFailed: false
                
            }
        },

        computed: {
            ...mapGetters(['isLoggedIn']),
            validEmailFormat(){
                if (this.registrationForm.email !== ''){
                    return EmailValidator.validate(this.registrationForm.email.toLowerCase())
                } 
                return null
                
            },

            passwordsMatch(){
                if (
                    this.registrationForm.password !== ''
                    && this.registrationForm.password_confirmation !== ''
                ){
                    return this.registrationForm.password === this.registrationForm.password_confirmation? true : false
                }
                return null
            },

            hasInvalidChars(){
                let invalidChars = ['`', '"', "'", '&', '%', '^', '*', '/', "\\", '.', '=', '{', '}', '[', ']', ';', ':' ]
                let hasInvalidChars = false

                for (let letter in this.registrationForm.password){
                    if (invalidChars.includes(this.registrationForm.password[letter])){
                        hasInvalidChars = true
                        break
                    } else {
                       hasInvalidChars = false 
                    }
                }
                return hasInvalidChars
            },

            passwordValidLength(){
                if (this.registrationForm.password !== ''){
                    return this.registrationForm.password.length >= 8 ? true : false
                } else {
                    return ''
                }
                
            },
            

            passwordFormat(){
                if (this.registrationForm.password.length === 0){
                    return null
                }
                return (!this.hasInvalidChars && this.passwordValidLength) ? true: false
            },

            enableSubmit(){
                if (
                   this.validEmailFormat
                   && this.registrationForm.name !== ''
                   && this.passwordFormat
                   && this.passwordsMatch
                   && this.registrationForm.email !== ''
                   && this.registrationForm.password !== ''
                   && this.registrationForm.password_confirmation!== ''
               
                ) {
                    return true
                } 
                return false
                
            }
        },

        created(){
            window.scrollTo(0, 0);
            this.checkIfLoggedIn();
        },

        mounted(){
            this.clearRegistrationForm()
        },

        methods: {  
            checkIfLoggedIn(){
                if (this.isLoggedIn){
                    return window.location = `/home/gallery`;
                }
            },

            clearEmailErr(){
                this.errors.email = ''
            },

            clearPwErr(){
                this.errors.password_confirmation = ''
            },

            async registerUser(){
                this.registering = true
                this.registeringEmail = this.registrationForm.email

                let formData = {
                    ...this.registrationForm
                }

                const response = await this.register(formData)
                console.log(response)
                this.registering = false
                if (response.data.success){
                    this.registrationFailed = false
                    this.accountCreated = true
                   
                    this.clearRegistrationForm()

                } else {
                    this.registrationFailed = true
                    //this.errors.email = response.error.code === "UsernameExistsException" ? 'Sorry, this email is taken.' : ''
                }
        
            
            },

            clearRegistrationForm(){
                this.registrationForm = {
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: ''
                }
            },

            ...mapActions(['register'])
        }
    }
</script>

<style scoped>
    .register-section{
        background: url('../../assets/images/collage.jpg');
    }

    .main-wrapper{
        background: rgb(0, 0, 0, 0.85);
    }
</style>

