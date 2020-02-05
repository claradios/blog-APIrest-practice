<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Join Us !</v-toolbar-title>
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
                <v-file-input
                  label="upload picture"
                  name="profile"
                  type="file"
                  id="file"
                  class="inputfile"
                  @change="handleUploadImage"
                  required
                ></v-file-input>
                <v-avatar size="56px" color="grey lighten-4">
                  <img :src="userImage" alt="avatar" />
                </v-avatar>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="sign()">SIGN UP</v-btn>
            </v-card-actions>
          </v-card>
          <v-card class="text-center" color="transparent" elevation="0">
            <div v-if="successMsg" class="success">
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
    },
    handleUploadImage (ev) {
      const files = ev
      if (!files) return

      const reader = new FileReader()
      reader.readAsDataURL(files)
      reader.onload = ev => {
        this.userImage = ev.target.result
      }
      document.querySelector('#file').value = ''
    }
  }
}
</script>

<style lang="scss">
</style>
