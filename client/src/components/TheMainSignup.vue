<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Login form</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-tooltip bottom></v-tooltip>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="Username"
                  placeholder="Jane Doe"
                  name="username"
                  v-model="username"
                  prepend-icon="mdi-account"
                  class="username"
                  type="text"
                  required
                ></v-text-field>

                <v-text-field
                  label="Nickname"
                  placeholder="nicky"
                  name="nickname"
                  v-model="nickname"
                  prepend-icon="mdi-account"
                  type="text"
                  required
                ></v-text-field>

                <v-text-field
                  id="password"
                  label="Password"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                  v-model="password"
                  class="password"
                  required
                ></v-text-field>
               <v-text-field
                  label="Picture"
                  placeholder="Enter url"
                  name="picture"
                  prepend-icon="mdi-file-image"
                  type="text"
                  v-model="userImage"
                  required
                ></v-text-field>
              </v-form>
              </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="sign()">Login</v-btn>
            </v-card-actions>
          </v-card >
           <v-card class="text-center" color="transparent" elevation=0>
              <div  v-if="successMsg" class="success">
                <p>Conseguido!</p>
                <p>
                  <router-link :to="'/login'">
                  <strong>Haz log in!</strong>
                  </router-link>
                </p>
              </div>
              <p v-if="errorMsg.length > 0" class="info-message">{{errorMsg}}</p>
            </v-card>

        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
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
