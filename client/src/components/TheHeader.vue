<template>
  <div>
    <v-navigation-drawer v-if="drawer" v-model="drawer" app>
      <v-list dense>
        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <div v-if="isLogged">
          <v-list-item link to="/new-post">
            <v-list-item-action>
              <v-icon>mdi-plus-box</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>new post</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>

        <div v-else>
          <v-list-item link to="/login">
            <v-list-item-action>
              <v-icon>mdi-account</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Log in</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>

        <div v-if="isAdmin === 'admin'">
          <v-list-item link to="/admin/settings/offensivewords">
            <v-list-item-action>
              <v-icon>mdi-settings</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>settings</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>

        <v-spacer></v-spacer>
        <v-list-item v-if="isLogged" @click="logOut()" >
          <v-list-item-action >
              <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Log out</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="dark-blue" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="nav"/>
      <v-toolbar-title v-if="isLogged">{{username}}'s Blog</v-toolbar-title>
      <v-toolbar-title v-else>My Blog</v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
import userInfo from '@/store/'
export default {
  name: 'TheHeader',
  data () {
    return {
      drawer: null,
      userInfo
    }
  },

  computed: {
    isAdmin () {
      return userInfo.state.userData.rol
    },
    isLogged () {
      return userInfo.state.token
    },
    username () {
      return userInfo.state.userData.username
    }
  },
  methods: {
    logOut () {
      localStorage.clear()
      userInfo.state.token = ''
      userInfo.state.userData = ''
      if (this.$router.currentRoute.path !== '/') {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.no-margin {
  margin: 0;
  width: 26px;
  height: 26px;
}
</style>
