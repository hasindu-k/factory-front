<template>
<PageHeader/>
<!-- <UserLogin/> -->
<HomePage/>
<PageFooter/>

</template>

<script>
import PageHeader from './components/PageHeader.vue'
// import UserLogin from './components/UserLogin.vue'
import PageFooter from './components/PageFooter.vue'
import HomePage from './components/HomePage.vue';

export default {
  name: 'App',
  components: {
    PageHeader,
    //UserLogin,
    PageFooter,
    HomePage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
