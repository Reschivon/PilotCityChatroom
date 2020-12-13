<template>
  <div class="home">
    <section class="welcome">
      <div class="auth">
        <h1>
          PilotCity Chat Room
        </h1>
        <div class="button-block">
          <button @click="AuthPage">Start Here</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

const Home = Vue.extend({
  name: "Home",
  methods: {
    AuthPage() {
      this.$router.push("/auth");
    },
  },
});
export default Home;
</script>

<style lang="scss" scoped>
.home {
  background: #4f4f4f;
  text-align: center;
}
.auth {
  margin-top: 20%;
  margin-bottom: 30%;
  font-size: 3rem;
  color: #3c9ccc;
}
.button-block {
  font-size: 2rem;
  color: white;
}
.font-raleway {
  font-family: Raleway;
}
</style>
