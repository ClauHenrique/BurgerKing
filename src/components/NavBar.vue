<script>
import { RouterLink } from "vue-router";
export default {
  name: "NavBar",
  props: ["logo", "alt"],
};
</script>

<template>
  <div>
    <nav class="navbar fixed-top navbar-dark bg-dark p-3">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">
          <img :src="logo" :alt="alt" width="40" height="40" />
        </router-link>

        <div class="d-flex-end" id="navbarSupportedContent">
          <router-link class="navbar-brand text-warning" to="/">Home</router-link>
          <router-link class="navbar-brand text-warning" to="/Pedidos">Pedidos</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>

</style>
