<template>
  <div class="login">
    <h1>Sign Up!</h1>
    <!-- <form action="action_page.php" method="post"> -->
    <div class="container">
      <div class="field-box">
        <label for="uname">
          <b>Username</b>
        </label>
        <input type="text" placeholder="Jane Doe" name="uname" v-model="username" required />
      </div>

      <div class="field-box">
        <label for="nickname">
          <b>Nickname</b>
        </label>
        <input type="text" placeholder="Jenny" name="nickname" v-model="nickname" required />
      </div>

      <div class="field-box">
        <label for="psw">
          <b>Password</b>
        </label>
        <input type="password" placeholder="12345678" name="psw" v-model="password" required />
      </div>

      <div class="field-box">
        <label for="picture">
          <b>Picture</b>
        </label>
        <input type="text" placeholder="Enter url" name="picture" v-model="userImage" required />
      </div>

      <button @click="sign()" class="btn">Sign up</button>
      <div  v-if="successMsg" class="success">
      <p>Conseguido!</p>
      <p>
        <router-link :to="'/login'">
          <strong>Haz log in!</strong>
        </router-link>
      </p>
      </div>
    </div>
    <!-- </form> -->
    <p v-if="errorMsg.length > 0" class="info-message">{{errorMsg}}</p>
  </div>
</template>

<script>
import signUpUser from '@/service/signUpUser'
export default {
  name: 'TheMainSignup',
  data () {
    return {
      successMsg: false,
      errorMsg: '',
      username: '',
      nickname: '',
      password: '',
      userImage:
        'https://cdn0.iconfinder.com/data/icons/user-collection-4/512/user-512.png'
    }
  },

  methods: {
    async sign () {
      try {
        await signUpUser(
          this.username,
          this.nickname,
          this.password,
          this.userImage
        )
        this.successMsg = true
      } catch (error) {
        console.log(error.message)

        this.errorMsg = error.message
      }
    }
  }
}
</script>

<style lang="scss">
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
}
</style>
