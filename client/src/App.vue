<template>
  <div id="app">
    <router-view :isLogged="isLogged" :token="token" :username="username" />
  </div>
</template>
<script>
export default {
  name: 'app',
  data () {
    return {
      isLogged: false,
      token: '',
      username: ''
    }
  },
  mounted () {
    const token = localStorage.getItem('token')
    const username = localStorage.getItem('username')
    const isLogged = JSON.parse(localStorage.getItem('isLogged'))
    if (username && token && isLogged) {
      this.token = token
      this.username = username
      this.isLogged = !this.isLogged
      console.log(token, username, isLogged)
    }
  },
  beforeDestroy () {
    localStorage.clear()
  }
}
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
