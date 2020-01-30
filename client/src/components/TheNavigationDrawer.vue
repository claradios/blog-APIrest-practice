 <template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
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
  </div>
</template>

<script>
import userInfo from '@/store/'
export default {
  name: 'TheNavigationDrawer',
  data () {
    return {
      componentKey: 0
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
