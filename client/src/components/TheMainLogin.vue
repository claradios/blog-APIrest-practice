<template>
  <div class="login">
    <h1>Log In!</h1>
    <!-- <form> -->

    <div class="container">
      <div class="field-box">
        <label for="uname">
          <b>Username</b>
        </label>
        <input type="text" placeholder="Jane Doe" name="username" v-model="username" required />
      </div>

      <div class="field-box">
        <label for="psw">
          <b>Password</b>
        </label>
        <input type="password" placeholder="12345678" name="psw" v-model="password" required />
      </div>

      <button @click="login()" class="btn">Login</button>
      <!-- <div class="field-box">
        <label>
          <input type="checkbox" checked="checked" name="remember" /> Remember me
        </label>
      </div>-->
      <p v-if="errorMsg.length > 0" class="info">{{errorMsg}}</p>
      <p>You don't have an account?</p>
      <p>
        <router-link :to="'/signup'">
          <strong>Sign Up!</strong>
        </router-link>
      </p>
    </div>

    <!-- </form> -->
  </div>
</template>

<script>
import userInfo from '@/store/'
export default {
  name: 'TheMainLogin',
  data () {
    return {
      username: '',
      password: '',
      errorMsg: ''
    }
  },
  methods: {
    async login () {
      if (!this.username || !this.password) {
        this.errorMsg = 'all fields are mandatory'
      } else {
        try {
          await userInfo.logUser(this.username, this.password)
          this.$router.push('/')
        } catch (error) {
          this.errorMsg = 'Incorrect username or password.'
        }
      }
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
  height: 100vh;
}

.container {
  background-color: rgb(235, 223, 223);
  padding: 20px;
  border-radius: 8px;
}

.field-box {
  display: flex;
  flex-direction: column;
  margin: 10px 0;
}
input {
  padding: 5px;
  text-align: center;
}
</style>
