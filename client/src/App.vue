<template>
  <div id="app">
    <router-view :userData="userData" />
  </div>
</template>
<script>
export default {
  name: 'app',
  data () {
    return {
      userData: {
        isLogged: false,
        token: '',
        username: ''
      }
    }
  },
  mounted () {
    const token = localStorage.getItem('token')
    const username = localStorage.getItem('username')
    const isLogged = JSON.parse(localStorage.getItem('isLogged'))
    if (username && token && isLogged) {
      this.userData.token = token
      this.userData.username = username
      this.userData.isLogged = !this.isLogged
      console.log(token, username, isLogged)
    }
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
