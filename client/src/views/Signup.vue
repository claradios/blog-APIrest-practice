<template>
  <div>
    <the-header/>
    <the-main-signup/>
    <the-footer/>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'
import TheMainSignup from '@/components/TheMainSignup.vue'
import TheFooter from '@/components/TheFooter.vue'

export default {
  name: 'signup',
  components: {
    TheHeader,
    TheMainSignup,
    TheFooter
  }
}
</script>
