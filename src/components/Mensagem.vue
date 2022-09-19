<script>
    export default {
        name: "Mensagem",
        props: {
            msg: String
        }
    }

</script>

<template>
   <div class="alert alert-primary mt-5 w-50" role="alert">
        <p class="text-center">{{msg}}</p>
    </div>
</template>

<style scoped>

</style>