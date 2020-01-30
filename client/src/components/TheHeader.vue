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
        <v-list-item link to="login">
          <v-list-item-action>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Log in</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  <v-app-bar app color="dark-blue" dark>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    <v-toolbar-title>My Blog</v-toolbar-title>
    <router-link :to="'/'" class="routes">
      <i class="fab fa-vuejs"></i> Home
    </router-link>
    <router-link v-if="isAdmin === 'admin'" :to="'/admin/settings/offensivewords'" class="routes">
      <i class="fas fa-cog"></i> settings
    </router-link>
    <div v-if="isLogged">
      <i class="fas fa-user"></i>
      {{username}}
      <button @click="logOut">
        <i class="fas fa-sign-out-alt"></i>
      </button>
    </div>
    <div v-else>
      <router-link :to="'/login'" class="routes">
        <i class="fas fa-user-plus"></i>
        <span>Log in</span>
      </router-link>
    </div>
  </v-app-bar>
  </div>
</template>
  <!-- <header :key="componentKey">
    <router-link :to="'/'" class="routes">
      <i class="fab fa-vuejs"></i> Home
    </router-link>
    <h1>my blog</h1>
    <router-link v-if="isAdmin === 'admin'" :to="'/admin/settings/offensivewords'" class="routes">
      <i class="fas fa-cog"></i> settings
    </router-link>
    <div v-if="isLogged">
      <i class="fas fa-user"></i>
      {{username}}
      <button @click="logOut">
        <i class="fas fa-sign-out-alt"></i>
      </button>
    </div>
    <div v-else>
      <router-link :to="'/login'" class="routes">
        <i class="fas fa-user-plus"></i><span> Log in</span>
      </router-link>
    </div>
  </header>-->

<script>
import userInfo from '@/store/'
export default {
  name: 'TheHeader',
  data () {
    return {
      drawer: null
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
      this.$router.go()
    }
  }
}
</script>

// <style scoped lang="scss">
// .routes {
//   color: #ffffff;
//   text-decoration: none;
// }

// header {
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   height: 50px;
//   background-color: #041e30;
//   color: #ffffff;
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
//   padding: 0 20px;
//   z-index: 10;
//   h1 {
//     font-size: 16px;
//     //font-style: italic;
//   }
//   button {
//     cursor: pointer;
//     color: #ffffff;
//     font-weight: bold;
//     background-color: transparent;
//     border: 0px solid;
//     font-size: 14px;
//     -webkit-appearance: none;
//   }
// }
</style>
