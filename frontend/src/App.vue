<template>
  <v-app id="app">
    <v-main class="secondary">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),
  // mounted: function() {
  //   let elHtml = document.getElementsByTagName("html")[0];
  //   elHtml.style.overflowY = "auto";
  // },
  // destroyed: function() {
  //   let elHtml = document.getElementsByTagName("html")[0];
  //   elHtml.style.overflowY = null;
  // }
};
</script>

<style scoped>
/* #app {
  height: 100%;
  width: 100%;
  overflow: hidden;
} */
</style>
