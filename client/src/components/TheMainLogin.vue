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
                ></v-text-field>

                <v-text-field
                  id="password"
                  label="Password"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                  v-model="password"
                  class="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="login()">Login</v-btn>
            </v-card-actions>
          </v-card >
           <v-card class="text-center" color="transparent" elevation=0>
            <p v-if="errorMsg.length > 0" class="info-message">{{errorMsg}}</p>
            <v-spacer></v-spacer>
            <p>You don't have an account?</p>
            <p>
              <router-link :to="'/signup'">
                <strong>Sign Up!</strong>
              </router-link>
            </p>
            </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
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

</style>
