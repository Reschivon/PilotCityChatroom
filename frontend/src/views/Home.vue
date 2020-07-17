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
<script>
export default {
  name: 'Home',
  components: {
  },
  methods: {
    AuthPage () {
      this.$router.push('/auth');
    }
  }
}
</script>
<style lang="scss" scoped>
  .home {  
    background: #4F4F4f;
    text-align: center;
  }
  .auth {
    margin-top: 20%;
    margin-bottom: 30%;
    font-size: 3rem;
    color: #3C9CCC;
  }
  .button-block{
    font-size: 2rem;
    color:white;
  }
  .font-raleway{
    font-family:Raleway;
  }
</style>