<script setup>
import { RouterLink, RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div>
    <NavBar :logo="logo_src" :alt="alt_img" />
    <RouterView />
    <div id="buxo">

    </div>
    <Footer />
  </div>
    
</template>

<script>
export default {
  components: {
    NavBar,
    Footer,
  },
  data() {
    return {
      logo_src: "../public/img/logo.png",
      alt_img: "imagem de hamburguer",
    };
  },
};
</script>

<style>
  #buxo {
    height: 370px;
  }
</style>
