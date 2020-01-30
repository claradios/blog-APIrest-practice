<template>
  <v-app id="inspire">
    <the-header/>
    <!-- <the-navigation-drawer/> -->
    <v-content><router-view/></v-content>
    <the-footer/>
  </v-app>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'
// import TheNavigationDrawer from '@/components/TheNavigationDrawer.vue'
import TheFooter from '@/components/TheFooter.vue'
export default {
  name: 'App',

  data: () => ({
    //
  }),
  components: {
    TheHeader,
    // TheNavigationDrawer,
    TheFooter
  }
}
</script>
