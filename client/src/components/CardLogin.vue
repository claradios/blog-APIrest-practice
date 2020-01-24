<template>
  <div class="login">
    <h1>Login!</h1>
    <!-- <form action="action_page.php" method="post"> -->

    <div class="container">
      <div class="field-box">
        <label for="uname">
          <b>Username</b>
        </label>
        <input type="text" placeholder="Enter Username" name="username" v-model="username" required />
      </div>

      <div class="field-box">
        <label for="psw">
          <b>Password</b>
        </label>
        <input type="password" placeholder="Enter Password" name="psw" v-model="password" required />
      </div>

      <button @click="login()">Login</button>
      <div class="field-box">
        <label>
          <input type="checkbox" checked="checked" name="remember" /> Remember me
        </label>
      </div>
      <p>
        You don't have an account?
        <router-link :to="'/signup'" class="routes">Sign Up!</router-link>
      </p>
    </div>

    <!-- </form> -->
  </div>
</template>

<script>
import userInfo from '@/store/'
export default {
  name: 'cardLogin',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async login () {
      await userInfo.logUser(this.username, this.password)
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
.routes {
  color: #ffffff;
  text-decoration: none;
}

.login {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.container {
  background-color: lightgrey;
}

.field-box {
  display: flex;
  flex-direction: column;
}
</style>
