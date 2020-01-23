<template>
  <div class="login">
    <h1>Sign Up!</h1>
    <!-- <form action="action_page.php" method="post"> -->
    <div class="container">
      <div class="field-box">
        <label for="uname">
          <b>Username</b>
        </label>
        <input type="text" placeholder="Enter Username" name="uname" v-model="username" required />
      </div>

      <div class="field-box">
        <label for="nickname">
          <b>Nickname</b>
        </label>
        <input type="text" placeholder="Enter Nickname" name="nickname" v-model="nickname" required />
      </div>

      <div class="field-box">
        <label for="psw">
          <b>Password</b>
        </label>
        <input type="password" placeholder="Enter Password" name="psw" v-model="password" required />
      </div>

      <div class="field-box">
        <label for="picture">
          <b>Picture</b>
        </label>
        <input type="text" placeholder="Enter url" name="picture" v-model="userImage" required />
      </div>

      <button @click="sign()">Sign up</button>
    </div>
    <!-- </form> -->
  </div>
</template>

<script>
import signUpUser from '@/service/signUpUser'
export default {
  name: 'cardSignup',
  data () {
    return {
      username: '',
      nickname: '',
      password: '',
      userImage: ''
    }
  },

  methods: {
    async sign () {
      // const {username,nickname,password,userImage}= this.user;
      await signUpUser(
        this.username,
        this.nickname,
        this.password,
        this.userImage
      )
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
}

.container {
  background-color: lightgrey;
}

.field-box {
  display: flex;
  flex-direction: column;
}
</style>
