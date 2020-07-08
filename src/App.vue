<template>
  <div id="app" class="d-flex">
    <!-- <navbar></navbar> -->
    <router-view />
  </div>
</template>

<script>
// import Navbar from "./components/Navbar";
export default {
  // components: { Navbar }
};
</script>

<style lang="scss">
@import "./assets/_variables.scss";
@import "bootstrap";
@import "./assets/_overrides.scss";
@import "~@sweetalert2/theme-bootstrap-4/bootstrap-4.scss";
#app {
  min-height: 100vh;
}
</style>
