<template>
  <v-app id="inspire">
    <the-header/>
    <v-content><router-view/></v-content>
    <the-footer/>
  </v-app>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'

export default {
  name: 'App',

  components: {
    TheHeader,
    TheFooter
  }
}
</script>
