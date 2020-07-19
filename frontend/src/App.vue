<template>
  <v-app id="app">
    <div class="secondary" id="wrapper">
      <router-view></router-view>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  })
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
#wrapper {
  height: 100%;
  width: 100%;
}
</style>
