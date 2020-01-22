<template>
  <div class="login">
    <h1>This is a Sign Up Box</h1>
    <!-- <form action="action_page.php" method="post"> -->
      <div class="imgcontainer">
        <img src="img_avatar2.png" alt="Avatar" class="avatar" />
      </div>

      <div class="container">
        <label for="uname">
          <b>Username</b>
        </label>
        <input
          type="text"
          placeholder="Enter Username"
          name="uname"
          v-model="username"
          required
        />

        <label for="nickname">
          <b>Nickname</b>
        </label>
        <input
          type="text"
          placeholder="Enter Nickname"
          name="nickname"
          v-model="nickname"
          required
        />

        <label for="psw">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="psw"
          v-model="password"
          required
        />

        <label for="picture">
          <b>Picture</b>
        </label>
        <input
          type="text"
          placeholder="Enter url"
          name="picture"
          v-model="userImage"
          required
        />

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
      await signUpUser(this.username, this.nickname, this.password, this.userImage)
    }
  }
}
</script>

<style lang="scss">
.container {
  background-color: yellow;
}
</style>
