<template>
    <section class="space-x-2" :class="{'flex' : forNavBar}">
        <div class="my-auto">
            <img 
                src="@/assets/images/dog.png" 
                alt="Logo" 
                class="my-auto w-10 mx-auto" 
                :class="{
                    'w-14' : !forNavBar
                }">
        </div>
        <div class="my-auto">
            <h1 :class="textClasses" class="my-auto"> PET CLICKER </h1>
        </div>
    </section>
</template>

<script>
export default {
    name: 'Logo',
    props: {
        textClasses: {
            type: String,
            required: false,
            default: 'text-gray-600 font-semibold text-lg'
        },
        forNavBar: {
            type: Boolean,
            required: false,
            default: false
        }
    }
}
</script>

<style>

</style>