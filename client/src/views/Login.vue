<template>
  <div>
    <the-header/>
    <the-main-login/>
    <the-footer/>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'
import TheMainLogin from '@/components/TheMainLogin.vue'
import TheFooter from '@/components/TheFooter.vue'

export default {
  name: 'login',
  components: {
    TheHeader,
    TheMainLogin,
    TheFooter
  }
}
</script>
