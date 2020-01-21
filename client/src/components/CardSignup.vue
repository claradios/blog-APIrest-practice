<template>
  <div class="login">
    <h1>This is a Sign Up Box</h1>
    <form action="action_page.php" method="post">
      <div class="imgcontainer">
        <img src="img_avatar2.png" alt="Avatar" class="avatar" />
      </div>

      <div class="container">
        <label for="uname">
          <b>Username</b>
        </label>
        <input type="text" placeholder="Enter Username" name="uname" required />

        <label for="nickname">
          <b>Nickname</b>
        </label>
        <input type="text" placeholder="Enter Nickname" name="nickname" required />

        <label for="psw">
          <b>Password</b>
        </label>
        <input type="password" placeholder="Enter Password" name="psw" required />

        <button type="submit">Sign up</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'cardSignup'
}
</script>

<style lang="scss">
.container {
  background-color: yellow;
}
</style>
