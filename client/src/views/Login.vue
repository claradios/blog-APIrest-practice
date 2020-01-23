<template>
  <div>
    <the-header :userData="userData"/>
    <card-login/>
    <the-footer/>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'
import CardLogin from '@/components/CardLogin.vue'
import TheFooter from '@/components/TheFooter.vue'

export default {
  name: 'login',
  props: {
    userData: Object
  },
  components: {
    TheHeader,
    CardLogin,
    TheFooter
  }
}
</script>
