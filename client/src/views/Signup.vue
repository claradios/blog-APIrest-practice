<template>
  <div>
    <the-header :userData="userData"/>
    <card-signup/>
    <the-footer/>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'
import CardSignup from '@/components/CardSignup.vue'
import TheFooter from '@/components/TheFooter.vue'

export default {
  name: 'signup',
  props: {
    userData: Object
  },
  components: {
    TheHeader,
    CardSignup,
    TheFooter
  }
}
</script>
