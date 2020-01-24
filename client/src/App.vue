<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import userInfo from '@/store/'
export default {
  name: 'app',
  mounted () {
    userInfo.getFromLocalStorage()
  },
  beforeDestroy () {
    localStorage.clear()
  }
}
</script>
<style>
html,
body,
#app {
  margin: 0;
  /* margin-top: 60px; */
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 14px;
}
</style>
